import CryptoJS from 'crypto-js/crypto-js'

class MD5 {
    Encryption(data) {
        return CryptoJS.MD5(data).toString()
    }
}

const md5 = new MD5();

export default md5;