/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false)
var previousScreen;
var ctitle;
var channelPositionTop;

function onDeviceReady() {
    StatusBar.backgroundColorByHexString("#001064");
    $('#Fullscreen').hide();
    checkSid();
    showScreen("#wallScreen");
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown() {
        showScreen(previousScreen);
    }
    $("#backNavA").click(function () {
        showScreen(previousScreen);
    })
}

function checkSid() {
    let prova = localStorage;
    console.log(prova);
    if (localStorage['sid']) {
        Model.getInstance().sid = localStorage.getItem('sid');
        let wall = new Wall();
        wall.getWall();
    } else {
        let communicationController = new CommunicationController();
        let response = function (result) {
            Model.getInstance().sid = result.sid;
            localStorage.setItem('sid', result.sid);
            let wall = new Wall();
            wall.getWall();
        }
        communicationController.register(response);
    }
}

function showScreen(id) {
    $(".screen").hide();
    $("#newPostDiv").hide();
    $(id).show();
    if (id == "#wallScreen") {
        //TODO: tornare alla posizione del canale cliccato quando si torna indietro dal canale
        $("#screenTitle").html("Accordo");
        $("#backNavA").hide();
        $("#navbarButtons").show();
        $('#splashScreen').fadeOut(100);
        //$("#channelScreen").css("transform", "translateX(" + $(window).width() +"px)");
        if (ctitle != undefined) {
            //console.log("offset: "+$('#'+ctitle).offset().top);
            $('html, body').animate({
                scrollTop: channelPositionTop - 300
            }, 0);
        }
    } else if (id == "#channelScreen") {
        $("#screenTitle").html(ctitle);
        $("#newPostDiv").show();
        $("#backNavA").show();
        $("#navbarButtons").hide();
        //$("#channelScreen").css("transform", "");
        previousScreen = "#wallScreen"
    } else if (id == "#sendImageScreen") {
        $("#screenTitle").html("Allega immagine");
        $("#navbarButtons").hide();
    } else if (id == "#mapScreen") {
        $("#sendLocationButton").css("visibility", "hidden");
        $("#screenTitle").html("Mappa");
        previousScreen = "#channelScreen";
    }
}