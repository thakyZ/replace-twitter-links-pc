const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { messages } = require("powercord/webpack");

module.exports = class ReplaceTwitterLinks extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "twitfix",
      description:
        "Replaces Twitter links to open in the app for other users without Powercord.",
      usage: "{c} <url>",
      executor: (args) => {
        const regexAGlobal =
          /(https:\/\/)(twitter.com\/([\w_\-\d]+)\/?(status)?\/?(\d+)?)(((\?|&)(s|t)=([\w\d]+|\d+))+)?/gi;
        if (args[0].search(regexAGlobal) !== -1) {
          return {
            send: true,
            result: `${args[0].replace(regexAGlobal, "$1vx$2")}`,
          };
        } else {
          return {
            send: false,
            result: `Invalid Twitter link: ${args[0]}`,
          };
        }
      },
    });
  }
  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("twitfix");
  }
};
