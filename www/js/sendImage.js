class SendImage {
    constructor(base64image) {
        previousScreen = "#channelScreen"

        // Messaggio immagine troppo grande (se si preme OK si torna alla home)
        if (base64image.length >= 137000) {
            let okSelected = confirm("L'immagine selezionata è troppo grande")
            if (okSelected) {
                showScreen("#channelScreen")
            }
        } else {
            // Mostra l'immagine
            showScreen("#sendImageScreen")
            $("#imageToSend").attr("src", "data:image/jpeg;base64," + base64image)

            // Gestore evento di click per inviare l'immagine
            $("#sendImageButton").click(function () {
                let communicationController = new CommunicationController()
                let response = function () {
                    let channel = new Channel(ctitle);
                    channel.getPosts();
                }
                communicationController.addPost(ctitle, "i", base64image, response)
            })
        }
    }
}