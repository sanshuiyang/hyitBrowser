const CryptoJS =  require('crypto-js/crypto-js');

class MD5 {
    Encryption(data) {
        return CryptoJS.MD5(data).toString()
    }
}

const md5 = new MD5();

console.log(md5.Encryption("yang"));

console.log(md5.Encryption(md5.Encryption("123456")));