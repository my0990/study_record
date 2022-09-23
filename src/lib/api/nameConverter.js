const nameConverter = (name) => {
    if(name === '강지현'){
        return 'jh@naver.com';
    } else if(name === '김의진'){
        return 'uj@naver.com';
    } else if(name === '고지웅'){
        return 'jw@naver.com';
    } else if(name === '조미란'){
        return 'mr@naver.com';
    } else {
        return 'nothing';
    }
}

export default nameConverter;