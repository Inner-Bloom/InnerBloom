module.exports = {
    "testEnvironment": "jsdom",
    "collectCoverage": true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,
  
    // The directory where Jest should output its coverage files
    "coverageDirectory": "coverage",
  
    // An array of regexp pattern strings used to skip coverage collection
    // coveragePathIgnorePatterns: [
    //   "/node_modules/"
    // ],
  
    // Indicates which provider should be used to instrument code for coverage
    "coverageProvider": "babel",

    "moduleNameMapper": {
         "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
         "\\.(css|less|scss|sass)$": "identity-obj-proxy"
       }
}