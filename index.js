const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { messages } = require("powercord/webpack");

let prefix;
module.exports = class timestamp extends Plugin {
  startPlugin() {
    prefix = "\\.twitfix=";
    this.patchMessage();
  }
  patchMessage() {
    //Lighty made this better because he felt like it
    inject(
      "twitfix-link",
      messages,
      "sendMessage",
      (args) => {
        const regexAGlobal = new RegExp(
          `${prefix}(https:\/\/)(twitter.com\/.*)`,
          "gi"
        );
        if (args[1].content.search(regexAGlobal) !== -1) {
          args[1].content = args[1].content.replace(regexAGlobal, "$1vx$2");
        }
        return args;
      },
      true
    );
  }
  pluginWillUnload() {
    uninject("twitfix-link");
    powercord.api.settings.unregisterSettings(this.entityID);
    powercord.api.settings.unregisterSettings(this.entityID);
  }
};
