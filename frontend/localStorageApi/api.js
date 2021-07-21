import * as SQLite from 'expo-sqlite'
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object

export const createMySpacesTable = () => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS MySpaces (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          spaceName TEXT, 
          progress FLOAT)`
      )
    })
};

export const createMyHesitatingItemsTable = () => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS MyHesitatingItems (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT, 
          story TEXT, 
          image TEXT default "no image",
          reminderDate DATE,
          spaceName TEXT 
          )`,
          null,
          (txObj, resultSet) => console.log('Success', resultSet),
          (txObj, error) => console.log('Error', error)
        )
    })
};

export const createSpace = (spaceName) => {
    database.transaction(tx => { 
      tx.executeSql(
        `INSERT INTO MySpaces (spaceName, progress) VALUES (?, ?)`, 
        [spaceName, 0.3],
        (txObj, resultSet) => console.log('Success', resultSet),
        (txObj, error) => console.log('Error', error))
    })
};

export const deleteSpace = (id) => {
    database.transaction(tx => {
        tx.executeSql('DELETE FROM MySpaces WHERE id = ?', 
        [id],
        (txObj, resultSet) => console.log('Success', resultSet),
        (txObj, error) => console.log('Error', error))
    })

    database.transaction(tx => {
        tx.executeSql('DELETE FROM MyHesitatingItems WHERE spaceId = ?', 
        [id],
        (txObj, resultSet) => console.log('Success', resultSet),
        (txObj, error) => console.log('Error', error))
    })
};

export const updateProgress = (SpaceName, points) => {

    //const currentpoints;
    //get current progress for space
    database.transaction(tx => {
        tx.executeSql('SELECT progrss FROM mySpaces', 
        null,
        (txObj, resultSet) => {
            console.log('Success', resultSet);
            resultSet
        },
        (txObj, error) => console.log('Error', error))
    });

    // database.transaction(tx => {
    //     tx.executeSql(`UPDATE MySpaces SET progress = ? WHERE spaceName = ?`, 
    //     [spaceName],
    //     (txObj, resultSet) => console.log('Success', resultSet),
    //     (txObj, error) => console.log('Error', error))
    // })
}


export const createHesitateItem = (title, story, image, reminderDate, space) => {
    database.transaction(tx => { 
        tx.executeSql(
          `INSERT INTO MyHesitatingItems (title, story, image, reminderDate, spaceName) VALUES (?, ?, ?, ?, ?)`, 
          [title, story, image, reminderDate, space],
          (txObj, resultSet) => console.log('Success', resultSet),
          (txObj, error) => console.log('Error', error))
      })
}

export const deleteHesitateItem = (id) => {
    database.transaction(tx => {
        tx.executeSql('DELETE FROM MyHesitatingItems WHERE id = ?', 
        [id],
        (txObj, resultSet) => console.log('Success', resultSet),
        (txObj, error) => console.log('Error', error))
    })
}

export const getHesitateItems = () => {
    database.transaction(tx => {
        tx.executeSql('SELECT * FROM MyHesitatingItems', 
        null,
        (txObj, resultSet) => {
            //console.log('Success', resultSet);
            let hesitateData = resultSet.rows._array;
            // this.setState({
            //   spaceData: spacesData,
            // });
            console.log(hesitateData);
    },
        (txObj, error) => console.log('Error', error))
    });
}

export const getHesitateItemByID = (id) => {
    database.transaction(tx => {
        tx.executeSql('SELECT * FROM MyHesitatingItems WHERE id = ? LIMIT 1', 
        [id],
        (txObj, resultSet) => {
            //console.log('Success', resultSet);
            let item = resultSet.rows._array;
            // this.setState({
            //   spaceData: spacesData,
            // });
            console.log(item);
    },
        (txObj, error) => console.log('Error', error))
    })
};



export const createMyStoriesTable = () => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS MyStoryItems (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT, 
            story TEXT, 
            image TEXT default "no image",
            spaceName TEXT 
            )`,
      )
    })
};


export const createStoryItem = (title, story, image, spaceName) => {
    database.transaction(tx => { 
        tx.executeSql(
          `INSERT INTO MyStoryItems (title, story, image, spaceName) VALUES (?, ?, ?, ?)`, 
          [title, story, image, spaceName],
          (txObj, resultSet) => console.log('Success', resultSet),
          (txObj, error) => console.log('Error', error))
      })
}












