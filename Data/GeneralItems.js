export default [
    {
      id: "0",
      title: "Jacket",
      sort: "衣服與配件",
      description:"too good to be true",
      method: {faceToface: true, post: true},
      image:[{id: '0', source:require('../assets/Space.jpg')},
              { id: '1', source: require('../assets/Space.jpg')}]
    },
    {
      id: "1",
      title: "Purse",
      sort: "衣服與配件",
      description:"too good to be true",
      method: {faceToface: false, post: true},
      image:[{id: '0', source:require('../assets/Space.jpg')},
              { id: '1',source: require('../assets/ic_clear.png')}]
    },
    {
      id: "2",
      title: "purse2",
      sort: "衣服與配件",
      description:"too good to be true",
      method: {faceToface: true, post: false},
      image:[{id: '0', source:require('../assets/Space.jpg')},
              { id: '1',source: require('../assets/home.jpg')},
              { id: '1',source: require('../assets/Space.jpg')}]
    },
];