//blur loading webpage
const bodyPage = document.body;
let load = 0;
const int = setInterval(showPage, 15)

function showPage() {
    load++;
    if (load > 99)
        clearInterval(int);
    bodyPage.style.filter = `blur(${scale(load,0,100,25,0)}px)`
}

const scale = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//second part after loading starts here!
const search_bar = document.querySelector(".search");
const searchSpace = document.querySelector(".user-space");
const excelBtn = document.getElementById("excel-icon");
//openig excel sheet when clicked on it!
excelBtn.addEventListener("click", () => {
    window.open("https://docs.google.com/spreadsheets/d/1Q77D6teW_DjAm45adMBYaPVcgWIN1mZL/edit#gid=810000805");
})
const listItem = [];


//fetching the file

async function GetUser() {
    const res = await fetch("https://api.slingacademy.com/v1/sample-data/users?limit=100");
    const data = await res.json();
    return data;
}
GetUser().then(data => {
    try {
        const user_info = data.users;
        user_info.forEach(user => {

            //creating a ul element
            const ul = document.createElement("ul");

            ul.className = "user-info-box";
            //pushing the ul element to listItems
            listItem.push(ul);
            const li_name = document.createElement("li");
            const li_email = document.createElement("li");
            const li_contact = document.createElement("li");
            //adding data to the li items
            li_name.innerText = `Name:${user.first_name} ${user.last_name}`;
            li_email.innerText = `Email Id:${user.email}`;
            li_contact.innerHTML = `Contact:${user.phone} <hr>`;
            //appending the list item to the ul we have created

            ul.appendChild(li_name);
            ul.appendChild(li_email);
            ul.appendChild(li_contact);
            //appending the ul to searchspace div
            searchSpace.appendChild(ul);



        })


        search_bar.addEventListener("input", e => {
            showUser(e.target.value);
        })

        function showUser(input_name) {
            listItem.forEach(e => {
                if (e.firstChild.innerText.trim().toLowerCase().includes(input_name.trim().toLowerCase())) {
                    e.classList.remove("hide");
                } else {
                    e.classList.add("hide");
                }
            })
        }







    } catch (err) {
        alert(err.name);
        alert(err.message);
    }
})