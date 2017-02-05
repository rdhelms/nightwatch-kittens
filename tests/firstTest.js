var expect = require('chai').expect;
var colors = require('colors');
module.exports = {
  tags : ['firstTest'],

  before : function (client) {
    // client.maximizeWindow();
    // Works better:
    client.execute(function() {
      return {
        newWidth: screen.width,
        newHeight: screen.height
      };
    }, [], function (response) {
      client.setWindowPosition(0, 0);
      client.resizeWindow(response.value.newWidth, response.value.newHeight);
    });
  },

  after : function (client) {
    client.pause(3000);
    client.end();
  },

  'search google for fluffy kittens' : function (client) {
    client.url('https://www.google.com');
    client.waitForElementVisible('#lst-ib', 30000, function () {
      client.setValue('#lst-ib', 'Fluffy Kittens', function () {
        client.waitForElementVisible('#_fZl', 30000, function () {
          client.click('#_fZl', function () {
            client.waitForElementVisible('#resultStats', 30000, function () {
              // expect('Kittens', 'Found a problem!').to.contain('anger'); // Causes assertion error with custom message. Uses Chai.
              console.log(' \u2714 '.green + 'Fluffy Kittens have been found');  // Logs out green unicode checkmark using node colors module.
              /** This does scroll down on the window, but it's immediate and choppy **/
              // client.pause(1000);
              // client.execute(function () {
              //   window.scrollTo(0, 3000);
              // });
              // client.pause(1000);
              // client.execute(function () {
              //   window.scrollTo(0, 0);
              // });
              /** **/
              client.pause(1000);
              for (var i = 0; i < 30; i++) {
                client.keys(['\uE015']);  // Down Arrow Key
              }
              client.pause(1000);
              for (var i = 0; i < 30; i++) {
                client.keys(['\uE013']);  // Up Arrow Key
              }
              client.pause(1000);
            });
          });
        });
      });
    });
  },

  'search google for angry kittens in new window' : function (client) {
    client.execute(function () {
      window.open('https://www.google.com', 'myWindow', 'width = ' + screen.width + ', height = ' + screen.height);
    }, [], function () {
      client.closeWindow(function () {
        client.windowHandles(function (handles) {
          client.switchWindow(handles.value[0], function () {
            client.waitForElementVisible('#lst-ib', 30000, function () {
              client.setValue('#lst-ib', 'Angry Kittens', function () {
                client.waitForElementVisible('#_fZl', 30000, function () {
                  client.click('#_fZl', function () {
                    client.waitForElementVisible('#resultStats', 30000, function () {
                      console.log(' \u2714 '.green + 'Angry Kittens have been found');  // Logs out green unicode checkmark using node colors module.
                      client.pause(1000);
                      for (var i = 0; i < 30; i++) {
                        client.keys(['\uE015']);  // Down Arrow Key
                      }
                      client.pause(1000);
                      for (var i = 0; i < 30; i++) {
                        client.keys(['\uE013']);  // Up Arrow Key
                      }
                      client.pause(1000);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
