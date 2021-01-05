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
var previousScreen
var ctitle
var channelPositionTop

function onDeviceReady() {
    $('#Fullscreen').hide();
    showScreen("#wallScreen")
    let wall = new Wall()
    wall.getWall()
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown() {
        showScreen(previousScreen);
    }
    $("#backNavA").click(function () {
        showScreen(previousScreen);
    })
}

function showScreen(id) {
    $(".screen").hide()
    $(id).show()
    if (id == "#wallScreen") {
        //TODO: tornare alla posizione del canale cliccato quando si torna indietro dal canale
        $("#screenTitle").html("Accordo")
        $("#newPostDiv").hide()
        $("#backNavA").hide()
        $("#navbarButtons").show()
        if (ctitle != undefined) {
            //console.log("offset: "+$('#'+ctitle).offset().top);
            $('html, body').animate({
                scrollTop: channelPositionTop - 300
            }, 0);
        }
    } else if (id == "#channelScreen") {
        $("#screenTitle").html(ctitle)
        $("#newPostDiv").show()
        $("#backNavA").show()
        $("#navbarButtons").hide()
        previousScreen = "#wallScreen"
    } else if(id == "#sendImageScreen") {
        $("#screenTitle").html("Allega immagine")
        $("#newPostDiv").hide()
        $("#navbarButtons").hide()
    } else if(id == "#mapScreen") {
        $("#newPostDiv").hide()
        $("#screenTitle").html("Mappa")
    }
}