(function() {
  module.exports = {
    autoToggle: {
      title: "Auto Toggle",
      description: "Toggle on start.",
      type: "boolean",
      "default": true,
      order: 1
    },
    comboMode: {
      type: "object",
      order: 2,
      properties: {
        enabled: {
          title: "Combo Mode - Enabled",
          description: "When enabled effects won't appear until reach the activation threshold.",
          type: "boolean",
          "default": true,
          order: 1
        },
        multiplier: {
          title: "Combo Mode - Multiplier",
          description: "Turn the multiplier on/off. (multiplier = streak * current level).",
          type: "boolean",
          "default": true,
          order: 2
        },
        activationThreshold: {
          title: "Combo Mode - Activation Threshold",
          description: "Streak threshold to activate the power mode and levels.",
          type: "array",
          "default": ['20', '50', '100', '200', '500']
        },
        streakTimeout: {
          title: "Combo Mode - Streak Timeout",
          description: "Timeout to reset the streak counter. In seconds.",
          type: "integer",
          "default": 10,
          minimum: 1,
          maximum: 100
        },
        exclamationEvery: {
          title: "Combo Mode - Exclamation Every",
          description: "Shows an exclamation every streak count. (Let in 0 to disable)",
          type: "integer",
          "default": 10,
          minimum: 0,
          maximum: 100
        },
        exclamationTexts: {
          title: "Combo Mode - Exclamation Texts",
          description: "Exclamations to show (randomized).",
          type: "array",
          "default": ["Super!", "Radical!", "Fantastic!", "Great!", "OMG", "Whoah!", ":O", "Nice!", "Splendid!", "Wild!", "Grand!", "Impressive!", "Stupendous!", "Extreme!", "Awesome!"]
        },
        opacity: {
          title: "Combo Mode - Opacity",
          description: "Opacity of the streak counter.",
          type: "number",
          "default": 0.6,
          minimum: 0,
          maximum: 1
        }
      }
    },
    particles: {
      type: "object",
      order: 3,
      properties: {
        enabled: {
          title: "Particles - Enabled",
          description: "Turn the particles on/off.",
          type: "boolean",
          "default": true,
          order: 1
        },
        colours: {
          type: "object",
          properties: {
            type: {
              title: "Colours",
              description: "Configure colour options",
              description: "Configure colour options. You can also use the command `Activate Power Mode:Select Color`",
              type: "string",
              "default": "cursor",
              "enum": [
                {
                  value: 'cursor',
                  description: 'Colour at the cursor.'
                }, {
                  value: 'randomSpawn',
                  description: 'Random colour per spawn.'
                }, {
                  value: 'random',
                  description: 'Random colours per particle.'
                }, {
                  value: 'fixed',
                  description: 'Fixed colour.'
                }
              ],
              order: 1
            },
            fixed: {
              title: "Fixed colour",
              description: "Colour when fixed colour is selected",
              type: "color",
              "default": "#fff"
            },
            randomType: {
              title: "Random colour type",
              description: "Type of ramdom colour",
              type: "string",
              "default": 'bright',
              "enum": [
                {
                  value: 'bright',
                  description: 'Bright colours'
                }, {
                  value: 'all',
                  description: 'All colours'
                }
              ]
            }
          }
        },
        totalCount: {
          type: "object",
          properties: {
            max: {
              title: "Particles - Max Total",
              description: "The maximum total number of particles on the screen.",
              type: "integer",
              "default": 500,
              minimum: 0
            }
          }
        },
        spawnCount: {
          type: "object",
          properties: {
            min: {
              title: "Particles - Minimum Spawned",
              description: "The minimum (randomized) number of particles spawned on input.",
              type: "integer",
              "default": 5
            },
            max: {
              title: "Particles - Maximum Spawned",
              description: "The maximum (randomized) number of particles spawned on input.",
              type: "integer",
              "default": 15
            }
          }
        },
        size: {
          type: "object",
          properties: {
            min: {
              title: "Particles - Minimum Size",
              description: "The minimum (randomized) size of the particles.",
              type: "integer",
              "default": 2,
              minimum: 0
            },
            max: {
              title: "Particles - Maximum Size",
              description: "The maximum (randomized) size of the particles.",
              type: "integer",
              "default": 4,
              minimum: 0
            }
          }
        },
        effect: {
          title: "Effect",
          description: "Defines the canvas effect. Select it with the command `Activate Power Mode:Select Effect`",
          type: "string",
          "default": "",
          order: 7
        }
      }
    },
    screenShake: {
      type: "object",
      order: 4,
      properties: {
        enabled: {
          title: "Screen Shake - Enabled",
          description: "Turn the shaking on/off.",
          type: "boolean",
          "default": true
        },
        minIntensity: {
          title: "Screen Shake - Minimum Intensity",
          description: "The minimum (randomized) intensity of the shake.",
          type: "integer",
          "default": 1,
          minimum: 0,
          maximum: 100
        },
        maxIntensity: {
          title: "Screen Shake - Maximum Intensity",
          description: "The maximum (randomized) intensity of the shake.",
          type: "integer",
          "default": 3,
          minimum: 0,
          maximum: 100
        }
      }
    },
    playAudio: {
      type: "object",
      order: 5,
      properties: {
        enabled: {
          title: "Play Audio - Enabled",
          description: "Play audio clip on/off.",
          type: "boolean",
          "default": false,
          order: 1
        },
        audioclip: {
          title: "Play Audio - Audioclip",
          description: "Which audio clip played at keystroke.",
          type: "string",
          "default": '../audioclips/gun.wav',
          "enum": [
            {
              value: '../audioclips/gun.wav',
              description: 'Gun'
            }, {
              value: '../audioclips/typewriter.wav',
              description: 'Type Writer'
            }, {
              value: 'customAudioclip',
              description: 'Custom Path'
            }
          ],
          order: 3
        },
        customAudioclip: {
          title: "Play Audio - Path to Audioclip",
          description: "Path to audioclip played at keystroke.",
          type: "string",
          "default": 'rocksmash.wav',
          order: 4
        },
        volume: {
          title: "Play Audio - Volume",
          description: "Volume of the audio clip played at keystroke.",
          type: "number",
          "default": 0.42,
          minimum: 0.0,
          maximum: 1.0,
          order: 2
        }
      }
    },
    excludedFileTypes: {
      order: 6,
      type: "object",
      properties: {
        excluded: {
          title: "Prohibit activate-power-mode from enabling on these file types:",
          description: "Use comma separated, lowercase values (i.e. \"html, cpp, css\")",
          type: "array",
          "default": ["."]
        }
      }
    },
    flow: {
      title: "Flow",
      description: "Defines the flow when typing. Select with the command `Activate Power Mode:Select Flow`",
      type: "string",
      "default": "",
      order: 7
    },
    plugins: {
      type: "object",
      order: 8,
      properties: {}
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9jb25maWctc2NoZW1hLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxVQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQU8sYUFBUDtNQUNBLFdBQUEsRUFBYSxrQkFEYjtNQUVBLElBQUEsRUFBTSxTQUZOO01BR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQUhUO01BSUEsS0FBQSxFQUFPLENBSlA7S0FERjtJQU9BLFNBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxRQUFOO01BQ0EsS0FBQSxFQUFPLENBRFA7TUFFQSxVQUFBLEVBQ0U7UUFBQSxPQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU8sc0JBQVA7VUFDQSxXQUFBLEVBQWEseUVBRGI7VUFFQSxJQUFBLEVBQU0sU0FGTjtVQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFIVDtVQUlBLEtBQUEsRUFBTyxDQUpQO1NBREY7UUFPQSxVQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU8seUJBQVA7VUFDQSxXQUFBLEVBQWEsb0VBRGI7VUFFQSxJQUFBLEVBQU0sU0FGTjtVQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFIVDtVQUlBLEtBQUEsRUFBTyxDQUpQO1NBUkY7UUFjQSxtQkFBQSxFQUNFO1VBQUEsS0FBQSxFQUFPLG1DQUFQO1VBQ0EsV0FBQSxFQUFhLHlEQURiO1VBRUEsSUFBQSxFQUFNLE9BRk47VUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxLQUFiLEVBQW9CLEtBQXBCLEVBQTJCLEtBQTNCLENBSFQ7U0FmRjtRQXdCQSxhQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU8sNkJBQVA7VUFDQSxXQUFBLEVBQWEsa0RBRGI7VUFFQSxJQUFBLEVBQU0sU0FGTjtVQUdBLENBQUEsT0FB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R0o7Y0FBQyxLQUFBLEVBQU8saUJBQVI7Y0FBMkIsV0FBQSxFQUFhLGFBQXhDO2FBSEk7V0FKTjtVQVNBLEtBQUEsRUFBTyxDQVRQO1NBUkY7UUFtQkEsZUFBQSxFQUNFO1VBQUEsS0FBQSxFQUFPLGdDQUFQO1VBQ0EsV0FBQSxFQUFhLHdDQURiO1VBRUEsSUFBQSxFQUFNLFFBRk47VUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLGVBSFQ7VUFJQSxLQUFBLEVBQU8sQ0FKUDtTQXBCRjtRQTBCQSxNQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU8scUJBQVA7VUFDQSxXQUFBLEVBQWEsK0NBRGI7VUFFQSxJQUFBLEVBQU0sUUFGTjtVQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFIVDtVQUlBLE9BQUEsRUFBUyxHQUpUO1VBS0EsT0FBQSxFQUFTLEdBTFQ7VUFNQSxLQUFBLEVBQU8sQ0FOUDtTQTNCRjtPQUhGO0tBekxGO0lBK05BLGlCQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQU8sQ0FBUDtNQUNBLElBQUEsRUFBTSxRQUROO01BRUEsVUFBQSxFQUNFO1FBQUEsUUFBQSxFQUNFO1VBQUEsS0FBQSxFQUFPLGlFQUFQO1VBQ0EsV0FBQSxFQUFhLGlFQURiO1VBRUEsSUFBQSxFQUFNLE9BRk47VUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLENBQUMsR0FBRCxDQUhUO1NBREY7T0FIRjtLQWhPRjtJQXlPQSxJQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQU8sTUFBUDtNQUNBLFdBQUEsRUFBYSx5RkFEYjtNQUVBLElBQUEsRUFBTSxRQUZOO01BR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO01BSUEsS0FBQSxFQUFPLENBSlA7S0ExT0Y7SUFnUEEsT0FBQSxFQUNFO01BQUEsSUFBQSxFQUFNLFFBQU47TUFDQSxLQUFBLEVBQU8sQ0FEUDtNQUVBLFVBQUEsRUFBWSxFQUZaO0tBalBGOztBQURGIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuICBhdXRvVG9nZ2xlOlxuICAgIHRpdGxlOiBcIkF1dG8gVG9nZ2xlXCJcbiAgICBkZXNjcmlwdGlvbjogXCJUb2dnbGUgb24gc3RhcnQuXCJcbiAgICB0eXBlOiBcImJvb2xlYW5cIlxuICAgIGRlZmF1bHQ6IHRydWVcbiAgICBvcmRlcjogMVxuXG4gIGNvbWJvTW9kZTpcbiAgICB0eXBlOiBcIm9iamVjdFwiXG4gICAgb3JkZXI6IDJcbiAgICBwcm9wZXJ0aWVzOlxuICAgICAgZW5hYmxlZDpcbiAgICAgICAgdGl0bGU6IFwiQ29tYm8gTW9kZSAtIEVuYWJsZWRcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJXaGVuIGVuYWJsZWQgZWZmZWN0cyB3b24ndCBhcHBlYXIgdW50aWwgcmVhY2ggdGhlIGFjdGl2YXRpb24gdGhyZXNob2xkLlwiXG4gICAgICAgIHR5cGU6IFwiYm9vbGVhblwiXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgb3JkZXI6IDFcblxuICAgICAgbXVsdGlwbGllcjpcbiAgICAgICAgdGl0bGU6IFwiQ29tYm8gTW9kZSAtIE11bHRpcGxpZXJcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUdXJuIHRoZSBtdWx0aXBsaWVyIG9uL29mZi4gKG11bHRpcGxpZXIgPSBzdHJlYWsgKiBjdXJyZW50IGxldmVsKS5cIlxuICAgICAgICB0eXBlOiBcImJvb2xlYW5cIlxuICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIG9yZGVyOiAyXG5cbiAgICAgIGFjdGl2YXRpb25UaHJlc2hvbGQ6XG4gICAgICAgIHRpdGxlOiBcIkNvbWJvIE1vZGUgLSBBY3RpdmF0aW9uIFRocmVzaG9sZFwiXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0cmVhayB0aHJlc2hvbGQgdG8gYWN0aXZhdGUgdGhlIHBvd2VyIG1vZGUgYW5kIGxldmVscy5cIlxuICAgICAgICB0eXBlOiBcImFycmF5XCJcbiAgICAgICAgZGVmYXVsdDogWycyMCcsICc1MCcsICcxMDAnLCAnMjAwJywgJzUwMCddXG4gICAgICAgICMgaXRlbXM6XG4gICAgICAgICMgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICAjICAgbWluaW11bTogMVxuICAgICAgICAjICAgbWF4aW11bTogMTAwMFxuXG4gICAgICBzdHJlYWtUaW1lb3V0OlxuICAgICAgICB0aXRsZTogXCJDb21ibyBNb2RlIC0gU3RyZWFrIFRpbWVvdXRcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lb3V0IHRvIHJlc2V0IHRoZSBzdHJlYWsgY291bnRlci4gSW4gc2Vjb25kcy5cIlxuICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICBkZWZhdWx0OiAxMFxuICAgICAgICBtaW5pbXVtOiAxXG4gICAgICAgIG1heGltdW06IDEwMFxuXG4gICAgICBleGNsYW1hdGlvbkV2ZXJ5OlxuICAgICAgICB0aXRsZTogXCJDb21ibyBNb2RlIC0gRXhjbGFtYXRpb24gRXZlcnlcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTaG93cyBhbiBleGNsYW1hdGlvbiBldmVyeSBzdHJlYWsgY291bnQuIChMZXQgaW4gMCB0byBkaXNhYmxlKVwiXG4gICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIGRlZmF1bHQ6IDEwXG4gICAgICAgIG1pbmltdW06IDBcbiAgICAgICAgbWF4aW11bTogMTAwXG5cbiAgICAgIGV4Y2xhbWF0aW9uVGV4dHM6XG4gICAgICAgIHRpdGxlOiBcIkNvbWJvIE1vZGUgLSBFeGNsYW1hdGlvbiBUZXh0c1wiXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkV4Y2xhbWF0aW9ucyB0byBzaG93IChyYW5kb21pemVkKS5cIlxuICAgICAgICB0eXBlOiBcImFycmF5XCJcbiAgICAgICAgZGVmYXVsdDogW1wiU3VwZXIhXCIsIFwiUmFkaWNhbCFcIiwgXCJGYW50YXN0aWMhXCIsIFwiR3JlYXQhXCIsIFwiT01HXCIsIFwiV2hvYWghXCIsIFwiOk9cIiwgXCJOaWNlIVwiLCBcIlNwbGVuZGlkIVwiLCBcIldpbGQhXCIsIFwiR3JhbmQhXCIsIFwiSW1wcmVzc2l2ZSFcIiwgXCJTdHVwZW5kb3VzIVwiLCBcIkV4dHJlbWUhXCIsIFwiQXdlc29tZSFcIl1cblxuICAgICAgb3BhY2l0eTpcbiAgICAgICAgdGl0bGU6IFwiQ29tYm8gTW9kZSAtIE9wYWNpdHlcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJPcGFjaXR5IG9mIHRoZSBzdHJlYWsgY291bnRlci5cIlxuICAgICAgICB0eXBlOiBcIm51bWJlclwiXG4gICAgICAgIGRlZmF1bHQ6IDAuNlxuICAgICAgICBtaW5pbXVtOiAwXG4gICAgICAgIG1heGltdW06IDFcblxuICBwYXJ0aWNsZXM6XG4gICAgdHlwZTogXCJvYmplY3RcIlxuICAgIG9yZGVyOiAzXG4gICAgcHJvcGVydGllczpcbiAgICAgIGVuYWJsZWQ6XG4gICAgICAgIHRpdGxlOiBcIlBhcnRpY2xlcyAtIEVuYWJsZWRcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUdXJuIHRoZSBwYXJ0aWNsZXMgb24vb2ZmLlwiXG4gICAgICAgIHR5cGU6IFwiYm9vbGVhblwiXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgb3JkZXI6IDFcblxuICAgICAgY29sb3VyczpcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIlxuICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgIHR5cGU6XG4gICAgICAgICAgICB0aXRsZTogXCJDb2xvdXJzXCJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbmZpZ3VyZSBjb2xvdXIgb3B0aW9uc1wiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25maWd1cmUgY29sb3VyIG9wdGlvbnMuIFlvdSBjYW4gYWxzbyB1c2UgdGhlIGNvbW1hbmQgYEFjdGl2YXRlIFBvd2VyIE1vZGU6U2VsZWN0IENvbG9yYFwiXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgICAgICBkZWZhdWx0OiBcImN1cnNvclwiXG4gICAgICAgICAgICBlbnVtOiBbXG4gICAgICAgICAgICAgIHt2YWx1ZTogJ2N1cnNvcicsIGRlc2NyaXB0aW9uOiAnQ29sb3VyIGF0IHRoZSBjdXJzb3IuJ31cbiAgICAgICAgICAgICAge3ZhbHVlOiAncmFuZG9tU3Bhd24nLCBkZXNjcmlwdGlvbjogJ1JhbmRvbSBjb2xvdXIgcGVyIHNwYXduLid9XG4gICAgICAgICAgICAgIHt2YWx1ZTogJ3JhbmRvbScsIGRlc2NyaXB0aW9uOiAnUmFuZG9tIGNvbG91cnMgcGVyIHBhcnRpY2xlLid9XG4gICAgICAgICAgICAgIHt2YWx1ZTogJ2ZpeGVkJywgZGVzY3JpcHRpb246ICdGaXhlZCBjb2xvdXIuJ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIG9yZGVyOiAxXG5cbiAgICAgICAgICBmaXhlZDpcbiAgICAgICAgICAgIHRpdGxlOiBcIkZpeGVkIGNvbG91clwiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb2xvdXIgd2hlbiBmaXhlZCBjb2xvdXIgaXMgc2VsZWN0ZWRcIlxuICAgICAgICAgICAgdHlwZTogXCJjb2xvclwiXG4gICAgICAgICAgICBkZWZhdWx0OiBcIiNmZmZcIlxuXG4gICAgICAgICAgcmFuZG9tVHlwZTpcbiAgICAgICAgICAgIHRpdGxlOiBcIlJhbmRvbSBjb2xvdXIgdHlwZVwiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUeXBlIG9mIHJhbWRvbSBjb2xvdXJcIlxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICAgICAgZGVmYXVsdDogJ2JyaWdodCdcbiAgICAgICAgICAgIGVudW06IFtcbiAgICAgICAgICAgICAge3ZhbHVlOiAnYnJpZ2h0JywgZGVzY3JpcHRpb246ICdCcmlnaHQgY29sb3Vycyd9XG4gICAgICAgICAgICAgIHt2YWx1ZTogJ2FsbCcsIGRlc2NyaXB0aW9uOiAnQWxsIGNvbG91cnMnfVxuICAgICAgICAgICAgXVxuXG4gICAgICB0b3RhbENvdW50OlxuICAgICAgICB0eXBlOiBcIm9iamVjdFwiXG4gICAgICAgIHByb3BlcnRpZXM6XG4gICAgICAgICAgbWF4OlxuICAgICAgICAgICAgdGl0bGU6IFwiUGFydGljbGVzIC0gTWF4IFRvdGFsXCJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtYXhpbXVtIHRvdGFsIG51bWJlciBvZiBwYXJ0aWNsZXMgb24gdGhlIHNjcmVlbi5cIlxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDUwMFxuICAgICAgICAgICAgbWluaW11bTogMFxuXG4gICAgICBzcGF3bkNvdW50OlxuICAgICAgICB0eXBlOiBcIm9iamVjdFwiXG4gICAgICAgIHByb3BlcnRpZXM6XG4gICAgICAgICAgbWluOlxuICAgICAgICAgICAgdGl0bGU6IFwiUGFydGljbGVzIC0gTWluaW11bSBTcGF3bmVkXCJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtaW5pbXVtIChyYW5kb21pemVkKSBudW1iZXIgb2YgcGFydGljbGVzIHNwYXduZWQgb24gaW5wdXQuXCJcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgICAgICBkZWZhdWx0OiA1XG5cbiAgICAgICAgICBtYXg6XG4gICAgICAgICAgICB0aXRsZTogXCJQYXJ0aWNsZXMgLSBNYXhpbXVtIFNwYXduZWRcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG1heGltdW0gKHJhbmRvbWl6ZWQpIG51bWJlciBvZiBwYXJ0aWNsZXMgc3Bhd25lZCBvbiBpbnB1dC5cIlxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDE1XG5cbiAgICAgIHNpemU6XG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCJcbiAgICAgICAgcHJvcGVydGllczpcbiAgICAgICAgICBtaW46XG4gICAgICAgICAgICB0aXRsZTogXCJQYXJ0aWNsZXMgLSBNaW5pbXVtIFNpemVcIlxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG1pbmltdW0gKHJhbmRvbWl6ZWQpIHNpemUgb2YgdGhlIHBhcnRpY2xlcy5cIlxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDJcbiAgICAgICAgICAgIG1pbmltdW06IDBcblxuICAgICAgICAgIG1heDpcbiAgICAgICAgICAgIHRpdGxlOiBcIlBhcnRpY2xlcyAtIE1heGltdW0gU2l6ZVwiXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbWF4aW11bSAocmFuZG9taXplZCkgc2l6ZSBvZiB0aGUgcGFydGljbGVzLlwiXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICAgICAgZGVmYXVsdDogNFxuICAgICAgICAgICAgbWluaW11bTogMFxuXG4gICAgICBlZmZlY3Q6XG4gICAgICAgIHRpdGxlOiBcIkVmZmVjdFwiXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIGNhbnZhcyBlZmZlY3QuIFNlbGVjdCBpdCB3aXRoIHRoZSBjb21tYW5kIGBBY3RpdmF0ZSBQb3dlciBNb2RlOlNlbGVjdCBFZmZlY3RgXCJcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICBkZWZhdWx0OiBcIlwiXG4gICAgICAgIG9yZGVyOiA3XG5cbiAgc2NyZWVuU2hha2U6XG4gICAgdHlwZTogXCJvYmplY3RcIlxuICAgIG9yZGVyOiA0XG4gICAgcHJvcGVydGllczpcbiAgICAgIGVuYWJsZWQ6XG4gICAgICAgIHRpdGxlOiBcIlNjcmVlbiBTaGFrZSAtIEVuYWJsZWRcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUdXJuIHRoZSBzaGFraW5nIG9uL29mZi5cIlxuICAgICAgICB0eXBlOiBcImJvb2xlYW5cIlxuICAgICAgICBkZWZhdWx0OiB0cnVlXG5cbiAgICAgIG1pbkludGVuc2l0eTpcbiAgICAgICAgdGl0bGU6IFwiU2NyZWVuIFNoYWtlIC0gTWluaW11bSBJbnRlbnNpdHlcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbWluaW11bSAocmFuZG9taXplZCkgaW50ZW5zaXR5IG9mIHRoZSBzaGFrZS5cIlxuICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICBkZWZhdWx0OiAxXG4gICAgICAgIG1pbmltdW06IDBcbiAgICAgICAgbWF4aW11bTogMTAwXG5cbiAgICAgIG1heEludGVuc2l0eTpcbiAgICAgICAgdGl0bGU6IFwiU2NyZWVuIFNoYWtlIC0gTWF4aW11bSBJbnRlbnNpdHlcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbWF4aW11bSAocmFuZG9taXplZCkgaW50ZW5zaXR5IG9mIHRoZSBzaGFrZS5cIlxuICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICBkZWZhdWx0OiAzXG4gICAgICAgIG1pbmltdW06IDBcbiAgICAgICAgbWF4aW11bTogMTAwXG5cbiAgcGxheUF1ZGlvOlxuICAgIHR5cGU6IFwib2JqZWN0XCJcbiAgICBvcmRlcjogNVxuICAgIHByb3BlcnRpZXM6XG4gICAgICBlbmFibGVkOlxuICAgICAgICB0aXRsZTogXCJQbGF5IEF1ZGlvIC0gRW5hYmxlZFwiXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlBsYXkgYXVkaW8gY2xpcCBvbi9vZmYuXCJcbiAgICAgICAgdHlwZTogXCJib29sZWFuXCJcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgb3JkZXI6IDFcblxuICAgICAgYXVkaW9jbGlwOlxuICAgICAgICB0aXRsZTogXCJQbGF5IEF1ZGlvIC0gQXVkaW9jbGlwXCJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiV2hpY2ggYXVkaW8gY2xpcCBwbGF5ZWQgYXQga2V5c3Ryb2tlLlwiXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgZGVmYXVsdDogJy4uL2F1ZGlvY2xpcHMvZ3VuLndhdidcbiAgICAgICAgZW51bTogW1xuICAgICAgICAgIHt2YWx1ZTogJy4uL2F1ZGlvY2xpcHMvZ3VuLndhdicsIGRlc2NyaXB0aW9uOiAnR3VuJ31cbiAgICAgICAgICB7dmFsdWU6ICcuLi9hdWRpb2NsaXBzL3R5cGV3cml0ZXIud2F2JywgZGVzY3JpcHRpb246ICdUeXBlIFdyaXRlcid9XG4gICAgICAgICAge3ZhbHVlOiAnY3VzdG9tQXVkaW9jbGlwJywgZGVzY3JpcHRpb246ICdDdXN0b20gUGF0aCd9XG4gICAgICAgIF1cbiAgICAgICAgb3JkZXI6IDNcblxuICAgICAgY3VzdG9tQXVkaW9jbGlwOlxuICAgICAgICB0aXRsZTogXCJQbGF5IEF1ZGlvIC0gUGF0aCB0byBBdWRpb2NsaXBcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIGF1ZGlvY2xpcCBwbGF5ZWQgYXQga2V5c3Ryb2tlLlwiXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgZGVmYXVsdDogJ3JvY2tzbWFzaC53YXYnXG4gICAgICAgIG9yZGVyOiA0XG5cbiAgICAgIHZvbHVtZTpcbiAgICAgICAgdGl0bGU6IFwiUGxheSBBdWRpbyAtIFZvbHVtZVwiXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlZvbHVtZSBvZiB0aGUgYXVkaW8gY2xpcCBwbGF5ZWQgYXQga2V5c3Ryb2tlLlwiXG4gICAgICAgIHR5cGU6IFwibnVtYmVyXCJcbiAgICAgICAgZGVmYXVsdDogMC40MlxuICAgICAgICBtaW5pbXVtOiAwLjBcbiAgICAgICAgbWF4aW11bTogMS4wXG4gICAgICAgIG9yZGVyOiAyXG5cbiAgZXhjbHVkZWRGaWxlVHlwZXM6XG4gICAgb3JkZXI6IDZcbiAgICB0eXBlOiBcIm9iamVjdFwiXG4gICAgcHJvcGVydGllczpcbiAgICAgIGV4Y2x1ZGVkOlxuICAgICAgICB0aXRsZTogXCJQcm9oaWJpdCBhY3RpdmF0ZS1wb3dlci1tb2RlIGZyb20gZW5hYmxpbmcgb24gdGhlc2UgZmlsZSB0eXBlczpcIlxuICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2UgY29tbWEgc2VwYXJhdGVkLCBsb3dlcmNhc2UgdmFsdWVzIChpLmUuIFxcXCJodG1sLCBjcHAsIGNzc1xcXCIpXCJcbiAgICAgICAgdHlwZTogXCJhcnJheVwiXG4gICAgICAgIGRlZmF1bHQ6IFtcIi5cIl1cblxuICBmbG93OlxuICAgIHRpdGxlOiBcIkZsb3dcIlxuICAgIGRlc2NyaXB0aW9uOiBcIkRlZmluZXMgdGhlIGZsb3cgd2hlbiB0eXBpbmcuIFNlbGVjdCB3aXRoIHRoZSBjb21tYW5kIGBBY3RpdmF0ZSBQb3dlciBNb2RlOlNlbGVjdCBGbG93YFwiXG4gICAgdHlwZTogXCJzdHJpbmdcIlxuICAgIGRlZmF1bHQ6IFwiXCJcbiAgICBvcmRlcjogN1xuXG4gIHBsdWdpbnM6XG4gICAgdHlwZTogXCJvYmplY3RcIlxuICAgIG9yZGVyOiA4XG4gICAgcHJvcGVydGllczoge31cbiJdfQ==
