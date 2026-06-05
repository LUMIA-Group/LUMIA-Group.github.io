const MATH_COMMANDS = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  theta: "θ",
  lambda: "λ",
  mu: "μ",
  pi: "π",
  sigma: "σ",
  phi: "φ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Pi: "Π",
  Sigma: "Σ",
  Phi: "Φ",
  Omega: "Ω",
  sum: "∑",
  prod: "∏",
  infty: "∞",
  leq: "≤",
  geq: "≥",
  neq: "≠",
  approx: "≈",
  times: "×",
  cdot: "·",
  mid: "|",
  lt: "<",
  gt: ">",
};

const MATH_OPERATORS = new Set(["argmax", "argmin", "log", "max", "min"]);
const MATH_LIMIT_OPERATORS = new Set([
  "argmax",
  "argmin",
  "max",
  "min",
  "prod",
  "sum",
]);

function escapeMathHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readBalancedGroup(source, startIndex) {
  let depth = 1;
  let cursor = startIndex + 1;
  let value = "";
  while (cursor < source.length && depth > 0) {
    const char = source[cursor];
    if (char === "{") {
      depth += 1;
      value += char;
    } else if (char === "}") {
      depth -= 1;
      if (depth > 0) {
        value += char;
      }
    } else {
      value += char;
    }
    cursor += 1;
  }
  return { value, endIndex: cursor };
}

function readMathArgument(source, startIndex) {
  let cursor = startIndex;
  while (/\s/.test(source[cursor] || "")) {
    cursor += 1;
  }
  if (source[cursor] === "{") {
    return readBalancedGroup(source, cursor);
  }
  if (source[cursor] === "\\") {
    const command = source.slice(cursor + 1).match(/^[A-Za-z]+/);
    if (command) {
      const value = `\\${command[0]}`;
      return { value, endIndex: cursor + command[0].length + 1 };
    }
  }
  return {
    value: source[cursor] || "",
    endIndex: Math.min(cursor + 1, source.length),
  };
}

function readMathScripts(source, startIndex) {
  let cursor = startIndex;
  let subscript = "";
  let superscript = "";
  let hasScripts = false;

  while (cursor < source.length) {
    let scriptCursor = cursor;
    while (/\s/.test(source[scriptCursor] || "")) {
      scriptCursor += 1;
    }

    const marker = source[scriptCursor];
    if (marker !== "_" && marker !== "^") {
      break;
    }

    const argument = readMathArgument(source, scriptCursor + 1);
    if (marker === "_") {
      subscript = argument.value;
    } else {
      superscript = argument.value;
    }
    cursor = argument.endIndex;
    hasScripts = true;
  }

  return {
    endIndex: cursor,
    hasScripts,
    subscript,
    superscript,
  };
}

function renderMathCommand(command) {
  if (MATH_OPERATORS.has(command)) {
    return `<span class="math-op">${escapeMathHtml(command)}</span>`;
  }
  if (Object.prototype.hasOwnProperty.call(MATH_COMMANDS, command)) {
    return escapeMathHtml(MATH_COMMANDS[command]);
  }
  return escapeMathHtml(command);
}

function renderMathLimitOperator(command, scripts) {
  const core =
    command === "sum" || command === "prod"
      ? MATH_COMMANDS[command]
      : command;
  const classes = [
    "math-limit-op",
    command === "sum" || command === "prod"
      ? "math-symbol-op"
      : "math-word-op",
  ];
  if (scripts.superscript) {
    classes.push("has-sup");
  }

  const top = scripts.superscript
    ? `<span class="math-limit math-limit-top">${renderMathFormula(
        scripts.superscript
      )}</span>`
    : "";
  const bottom = scripts.subscript
    ? `<span class="math-limit math-limit-bottom">${renderMathFormula(
        scripts.subscript
      )}</span>`
    : "";
  return `<span class="${classes.join(
    " "
  )}">${top}<span class="math-limit-core">${escapeMathHtml(
    core
  )}</span>${bottom}</span>`;
}

export function renderMathFormula(source) {
  let cursor = 0;
  let result = "";
  while (cursor < source.length) {
    const char = source[cursor];
    if (/\s/.test(char)) {
      result += " ";
      while (/\s/.test(source[cursor + 1] || "")) {
        cursor += 1;
      }
      cursor += 1;
    } else if (char === "\\") {
      const command = source.slice(cursor + 1).match(/^[A-Za-z]+/);
      if (command) {
        const commandName = command[0];
        const commandEndIndex = cursor + commandName.length + 1;
        const scripts = readMathScripts(source, commandEndIndex);
        if (MATH_LIMIT_OPERATORS.has(commandName) && scripts.hasScripts) {
          result += renderMathLimitOperator(commandName, scripts);
          cursor = scripts.endIndex;
        } else {
          result += renderMathCommand(commandName);
          cursor = commandEndIndex;
        }
      } else {
        result += escapeMathHtml(source[cursor + 1] || "");
        cursor += 2;
      }
    } else if (char === "_" || char === "^") {
      const argument = readMathArgument(source, cursor + 1);
      const tag = char === "_" ? "sub" : "sup";
      result += `<${tag}>${renderMathFormula(argument.value)}</${tag}>`;
      cursor = argument.endIndex;
    } else if (char === "{" || char === "}") {
      cursor += 1;
    } else {
      result += escapeMathHtml(char);
      cursor += 1;
    }
  }
  return result.trim();
}
