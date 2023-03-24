var i = 0;
var size = 0;

var previous = document.getElementById('previous')
var next = document.getElementById('next')
var structure = document.getElementById('structure')
var error = document.getElementById('error')

async function searchValue(status) {
    var searchval = document.getElementById('search').value

    if(status === "next"){
        i+=1
    }
    else if(status === "previous"){
        i-=1
    }

    await fetch('http://localhost:3000/resume/')
        .then(response => response.json())
        .then(valueSet => {
            findsize(valueSet)
            // console.log("dzfzscd "+valueSet[0].id)
            // console.log("status: "+status +"\nsearch value: "+searchval+"\n"+"next: "+i+"\nSize: "+size)

            if(searchval.length==0) {
                controller()
                updatePage(valueSet)
            }
            else{
                var valueSet = Object.values(valueSet).filter(value => {
                    return value.basics.AppliedFor.toLowerCase() === searchval.toLowerCase();
                });
                findsize(valueSet)
                console.log("Filter\n"+"status: "+status +"\nsearch value: "+searchval+"\n"+"next: "+i+"\nSize: "+size)
                
                controller()
                if(size>-1){
                    updatePage(valueSet)
                }
            }
        })
        .catch(error => console.log(error.message))
}

const controller = function(){
    if(size == -1){
        previous.style.visibility = 'hidden'
        next.style.visibility = 'hidden'
        structure.style.display = 'none'
        error.style.display = "flex"
        error.style.flexDirection = "row"
        error.style.justifyContent = "space-evenly"
    }
    else if(size == 0){
        previous.style.visibility = 'hidden'
        next.style.visibility = 'hidden'
        structure.style.display = 'block'
        error.style.display = "none"
    }
    else if(size>0){
        error.style.display = "none"
        if(i==0){
            previous.style.visibility = 'hidden'
            next.style.visibility = 'visible'
            structure.style.display = 'block'
        }
        else if(i==size){
            previous.style.visibility = 'visible'
            next.style.visibility = 'hidden'
            structure.style.display = 'block'
        }
        else{
            previous.style.visibility = 'visible'
            next.style.visibility = 'visible'
            structure.style.display = 'block'
        }
    }
}

const findsize = function(value){
    size = Object.keys(value).length-1
}

const updatePage = function(value){
    header(value[i])
    sidebar(value[i])
    mainPage(value[i])
    projects(value[i])
    education(value[i])
    internship(value[i])
    achievements(value[i])
}

const header = function(value){

    var code = `
        <div>
            <h3 id="Name">${value.basics.name}</h3>
            <h4 id="Designation">Applied For : ${value.basics.AppliedFor}</h4>
        </div>
        <i class="fas fa-user" style="font-size: 100px; margin-right : 10%"></i>
    `
    document.getElementById('Header').innerHTML = code
}

const sidebar = function(value){

    var techSkills = ``;
    var hobbies = ``;

    value.skills.keywords.map((item)=>{techSkills+=`<li>${item}</li>`})
    value.interests.hobbies.map((item)=>{hobbies+=`<li>${item}</li>`})

    var code = `
        <!-- 1. Contact -->
        <article class="objective1">
            <h4 class="titles">Personal Information</h4>
            <ul class="detailsList">
                <li>${value.basics.phone}</li>
                <li>${value.basics.email}</li>
                <li><a href=${value.basics.profiles.url} target="blank">LinkedIn</a></li>
            </ul>
        </article>
        
        
        <!-- 2. Technical Details -->
        <article class="objective1">
            <h4 class="titles">Technical Skills</h4>
            <ul class="detailsList">
                ${techSkills}
            </ul>
        </article>

        <!-- 3. Hobbies -->
        <article class="objective1">
            <h4 class="titles">Hobbies</h4>
            <ul class="detailsList">
                ${hobbies}
            </ul>
        </article>
    `
    document.getElementById('leftPage').innerHTML = code
}

const mainPage = function(value){

    var ele =  ``;
    var props = Object.getOwnPropertyNames(value.work)
    var vals = Object.values(value.work)
    vals.map((item, ind) => {
        ele+= `<p><b>${props[ind]}: </b> ${item}</p>`
    });
    document.getElementById('workDates').innerHTML = ele
}

const projects = function(value){
    var code = `
        <p><b>${value.projects.name}</b> : ${value.projects.description}</p>
    </ul>
    `
    document.getElementById('projects').innerHTML = code
}

const education = function(value){

    var ele =  ``;
    var vals = Object.values(value.education)
    var eds = ["UG", "PU", "High School"]
    vals.map((item,ind)=>{

        var names = Object.values(item)
        console.log(names)
        ele+=`<li><b>${eds[ind]}:</b> `
        
        names.map((element)=>{ele+=`${element}, `})

        // removing trailing  comma and space
        if (ele.endsWith(', ')) {
            ele = ele.slice(0, -2);
        }
        ele+=`</li>`
    })
    document.getElementById('education').innerHTML = ele
}

const internship  = function(value){
    var ele = ``;
    var props = Object.getOwnPropertyNames(value.Internship)
    var vals = Object.values(value.Internship)
    vals.map((item, ind) => {
        ele+= `<li><b>${props[ind]}: </b> ${item}</li>`
    });
    document.getElementById('internship').innerHTML = ele
}

const achievements  = function(value){
    var ele=``;   
    value.achievements.Summary.map((item)=>{ele+=`<li>${item}</li>`})
    console.log(ele)
    document.getElementById('achievements').innerHTML = ele
}