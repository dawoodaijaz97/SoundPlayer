



//list of ("Exact") Project names
let projects = ["Project 1","Dawood",]; //creates name of project

//for adding new Project to navigation
//projects.push("project name");

$("document").ready(function() {



    //creates menu of of project
    for(let i = 0;i<projects.length;i++){
        createMenuItem(projects[i],i);
    }


});


//create menu item (navigation item) for each project in the project array
var createMenuItem = function (project,i) {

    let menuItem = $("" +
        "<li class=\"menuItem\">\n" +
        "    <a href=\"\"><p>Name of the Project</p></a>\n" +
        "</li>");
    menuItem.attr("id",project.replace(/[^A-Z0-9]/ig,""));//remove the space and special characters in project name

    menuItem.find("a").attr("href","./projects/"+project+".html");//add href attribute to the "<a>" tag
    menuItem.find("p").text(i+1+". "+project);//set project name in navigation item

    let navigationMenu = $("#navigation");
    navigationMenu.append(menuItem); //append navigation item in the navigation menu
};

