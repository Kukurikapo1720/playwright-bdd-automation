module.exports = {
  default: {
    require: [
      "lib/step-definitions/**/*.js",
      "lib/support/**/*.js" 
    ],
    paths: ["features/**/*.feature"],
    exit: true             
  }
};
