interface Palindrome {
    input: string | undefined,
    date: string,
    time: string,
    isPalindrome: boolean
}

// let paliArray:Palindrome[] = JSON.parse(localStorage.getItem("userHistory") || "[]");
// console.log(localStorage.getItem("userHistory"));
let paliArray: Palindrome[] = [];
localStorage.removeItem("userHistory")

const btn = document.getElementById('check') as HTMLButtonElement | null
const filterSelect = document.getElementById("filter") as HTMLSelectElement | null
const tableBody = document.getElementById("historyTable");
// Modal elements
const modal = document.getElementById("deleteModal")!;
const cancelBtn = document.getElementById("cancelDelete")!;
const confirmBtn = document.getElementById("confirmDelete")!;

let deleteIndex: number | null = null;
renderTable()
btn?.addEventListener('click', ()=>{
    const paliInput = document.getElementById('pali') as HTMLInputElement
    const display = document.getElementById('show') as HTMLElement
    const show = document.getElementById("inputShow") as HTMLElement

    if (!paliInput.value) {
        show.innerHTML = `<p class="text-red-500 ps-1 text-[12px]">Fill in the empty input</p>`
        setTimeout(() => {
            show.innerHTML = ""
        }, 2000);
    } else{
        
        let paliInfo:Palindrome = {
            input: paliInput?.value,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            isPalindrome: false
        }
        const {input, date, time} = paliInfo
        // console.log(input,date,time);
        
        const changeLower = input?.toLowerCase()
        const reversed = changeLower?.split('').reverse().join('')
        const itIsPalindrome = changeLower === reversed
        paliInfo.isPalindrome = itIsPalindrome
        paliArray.push(paliInfo)
        localStorage.setItem('userHistory', JSON.stringify(paliArray))
        console.log(paliArray);
        renderTable()

        
        if (changeLower == reversed) {
            display.innerHTML = `
            <p class="text-center my-2 bg-green-100 border border-green-500 text-green-700 p-1 text-sm rounded">${input} is a palindrome</p>
            `
        } else{
            display.innerHTML = `
            <p class="text-center my-2 text-sm bg-red-100 border border-red-500 text-red-700 p-1 rounded">${input} is not a palindrome</p>
            `
        }
        setTimeout(() => {
            display.innerHTML = ""
        }, 3000);
        paliInput.value = ""
    } 
})

filterSelect?.addEventListener('change', ()=>{
    const selectedFilter = filterSelect.value as "all" | "palindrome" | "non-palindrome"
    renderTable(selectedFilter)
})

function renderTable(filter: "all" | "palindrome" | "non-palindrome" = "all"){
    // console.log(`filtering by: ${filter}`);
    if(!tableBody) return
    tableBody.innerHTML = ""
    const filteredArray = paliArray.filter((e)=>{
        if (filter === "all") {
            return true
        } else if(filter === "palindrome"){
            return e.isPalindrome
        } else{
            return !e.isPalindrome
        }
    })
    console.log(filteredArray);
    filteredArray.forEach((e, index)=>{
        const row = document.createElement("tr")
        row.innerHTML = `
        
            <td class="py-2  text-center text-sm">${e.input}</td>
            <td class="py-2  text-center text-sm">${e.date}</td>
            <td class="py-2  text-center text-sm">${e.time}</td>
            <td class="text-center text-sm font-bold ${e.isPalindrome ? "text-green-500" : "text-red-500"}">
            ${e.isPalindrome ? "Palindrome" : "Not a Palindrome"}
            </td>
            <td class="py-2 px-3 text-center text-sm">
            <button class="delete-btn bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded" data-index="${index}"> Delete </button>
            </td>
        
        `
        tableBody.appendChild(row)
    })
    // Attach modal delete logic
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target as HTMLButtonElement;
            deleteIndex = parseInt(target.dataset.index!);
            modal.classList.remove("hidden");
        });
    });
}


// Modal cancel
cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    deleteIndex = null;
});

// Modal confirm delete
confirmBtn.addEventListener("click", () => {
    if (deleteIndex !== null) {
        paliArray.splice(deleteIndex, 1);
        localStorage.setItem("userHistory", JSON.stringify(paliArray));
        renderTable();
        deleteIndex = null;
    }
    modal.classList.add("hidden");
});
