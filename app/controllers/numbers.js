const NumberModel = require('../models/numbers.js')
const { google } = require("googleapis");

module.exports = {
  POST: async (req, res) => {
    try {
      const number = await NumberModel.insertNumber(req)
      
      res.send(number)
    } catch (error) {
      res.send(error)
    }
  },
  
  GET: async (req, res) => {
    try {
      const numbers = await NumberModel.getNumbers(req)
      
      res.send(numbers)
    } catch (error) {
      res.send(error)
    }
  }
  
  ,
  GET_FORMS: async (req, res) => {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      
      const spreadsheetId = '1KHP_BYXxoLnKvR7OrLNEAH_sr6k4enmfc036NwC5T4k';
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        majorDimension:"COLUMNS",
        range: 'A2:A500000',
      });
      
      res.send({
        value : getRows.data.values[0].length
      });
    } catch (error) {
      res.send(error)
    }
  }
}
