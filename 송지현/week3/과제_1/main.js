document.addEventListener("DOMContentLoaded", function () {
  const output = document.querySelector("input[name='output']"); 


  document.addEventListener("keydown", function (event) {
    const lastChar = output.value.slice(-1);

    if (event.key >= "0" && event.key <= "9") {
      output.value += event.key;
    }

    if (["+", "-", "*", "/"].includes(event.key)) {

      if (output.value === "" || ["+", "-", "*", "/"].includes(lastChar)) {
        return;
      }

      output.value += event.key;
    }

    if (event.key === ".") {

      if (
        output.value === "" || 
        lastChar === "." || 
        output.value
          .split(/[\+\-\*\/]/)
          .pop()
          .includes(".")
      ) {
        return;
      }

      output.value += event.key;
    }

    
    if (event.key === "Enter") {
      try {
        output.value = eval(output.value);
      } catch (error) {
        output.value = "Error";
      }
    }

    if (event.key === "Backspace") {
      output.value = output.value.slice(0, -1);
    }

    if (event.key === "Escape") {
      output.value = "";
    }

    event.preventDefault();
  });
});