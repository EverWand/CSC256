function setPageDetails()
{
    //Introduction:
    document.getElementById("Intro").textContent = "Howdy";                 //Introduction
    document.getElementById("NameH1").textContent = "I'm Lucas Foxworthy";  //My Name

    //Education:
    document.getElementById("GradLabel").textContent = "Graduating: March 2025";        //Graduation Time
    document.getElementById("Major_Name1").textContent = "Advancing Computer Science";  //1st Major
    document.getElementById("Major_Name2").textContent = "Game Programming";            //2nd Major
    document.getElementById("MajorType1").textContent = "Bachelor's";          //Bachelor's Degree Type
    document.getElementById("MajorType2").textContent = "Bachelor's";          //Bachelor's Degree Type

    //Contact:
    document.getElementById("ContactlabelTxt").textContent = "Contact";     //Contact Label
    document.getElementById("Email").textContent = "lucfoxwo@uat.edu";      //Email

    //Page Link:
    document.getElementById("pageAnchor").textContent = "Check out what this page looks like without JavaScript";      //Page Anchor Text

    //Footer:
    document.getElementById("Credits").textContent = "Page Created By Lucas Foxworthy"; //Credits
    document.getElementById("Date").textContent = "Last Updated: 6/1/2024";            //Page Date
}