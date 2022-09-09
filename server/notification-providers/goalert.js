const NotificationProvider = require("./notification-provider");
const axios = require("axios");
const { UP } = require("../../src/util");

class GoAlert extends NotificationProvider {

    name = "GoAlert";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        let okMsg = "Sent Successfully.";
        try {
            let closeAction = "close";
            let data = {
                summary: msg,
            };
            if (heartbeatJSON != null && heartbeatJSON["status"] === UP) {
                data["action"] = closeAction;
            }
            let headers = {
                "Content-Type": "multipart/form-data",
            };
            let config = {
                headers: headers
            };
            let resp = await axios.post(`${notification.goAlertBaseURL}/api/v2/generic/incoming?token=${notification.goAlertToken}`, data, config);
            return okMsg;

        } catch (error) {
            let msg = (error.response.data) ? error.response.data : "Error without response";
            throw new Error(msg);
        }
    }
}

module.exports = GoAlert;