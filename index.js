// let paliArray:Palindrome[] = JSON.parse(localStorage.getItem("userHistory") || "[]");
// console.log(localStorage.getItem("userHistory"));
var paliArray = [];
localStorage.removeItem("userHistory");
var btn = document.getElementById('check');
var filterSelect = document.getElementById("filter");
var tableBody = document.getElementById("historyTable");
renderTable();
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () {
    var paliInput = document.getElementById('pali');
    var display = document.getElementById('show');
    if (!paliInput.value) {
        alert('Fill in the input');
    }
    else {
        var paliInfo = {
            input: paliInput === null || paliInput === void 0 ? void 0 : paliInput.value,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            isPalindrome: false
        };
        var input = paliInfo.input, date = paliInfo.date, time = paliInfo.time;
        // console.log(input,date,time);
        var changeLower = input === null || input === void 0 ? void 0 : input.toLowerCase();
        var reversed = changeLower === null || changeLower === void 0 ? void 0 : changeLower.split('').reverse().join('');
        var itIsPalindrome = changeLower === reversed;
        paliInfo.isPalindrome = itIsPalindrome;
        paliArray.push(paliInfo);
        localStorage.setItem('userHistory', JSON.stringify(paliArray));
        console.log(paliArray);
        renderTable();
        if (changeLower == reversed) {
            display.innerHTML = "\n            <p class=\"text-center my-2 bg-green-100 border border-green-500 text-green-700 p-1 text-sm rounded\">".concat(input, " is a palindrome</p>\n            ");
        }
        else {
            display.innerHTML = "\n            <p class=\"text-center my-2 text-sm bg-red-100 border border-red-500 text-red-700 p-1 rounded\">".concat(input, " is not a palindrome</p>\n            ");
        }
        setTimeout(function () {
            display.innerHTML = "";
        }, 3000);
        paliInput.value = "";
    }
});
filterSelect === null || filterSelect === void 0 ? void 0 : filterSelect.addEventListener('change', function () {
    var selectedFilter = filterSelect.value;
    renderTable(selectedFilter);
});
function renderTable(filter) {
    if (filter === void 0) { filter = "all"; }
    // console.log(`filtering by: ${filter}`);
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    var filteredArray = paliArray.filter(function (e) {
        if (filter === "all") {
            return true;
        }
        else if (filter === "palindrome") {
            return e.isPalindrome;
        }
        else {
            return !e.isPalindrome;
        }
    });
    console.log(filteredArray);
    filteredArray.forEach(function (e, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n        \n            <td class=\"py-2  text-center text-sm\">".concat(e.input, "</td>\n            <td class=\"py-2  text-center text-sm\">").concat(e.date, "</td>\n            <td class=\"py-2  text-center text-sm\">").concat(e.time, "</td>\n            <td class=\"text-center text-sm font-bold ").concat(e.isPalindrome ? "text-green-500" : "text-red-500", "\">\n            ").concat(e.isPalindrome ? "Palindrome" : "Not a Palindrome", "\n            </td>\n            <td class=\"py-2 px-3 text-center text-sm\">\n            <button class=\"delete-btn bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded\" data-index=\"").concat(index, "\"> Delete </button>\n            </td>\n        \n        ");
        tableBody.appendChild(row);
    });
    document.querySelectorAll(".delete-btn").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var target = event.target;
            var indexToDelete = parseInt(target.dataset.index);
            deleteEntry(indexToDelete);
        });
    });
}
function deleteEntry(index) {
    var confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
        paliArray.splice(index, 1);
        localStorage.setItem("userHistory", JSON.stringify(paliArray));
        renderTable();
    }
}
