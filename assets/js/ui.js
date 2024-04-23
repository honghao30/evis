//modal 열기
const openModal = event => {
    _this = event.target;
    modalId = _this.getAttribute('modal-id');
    openTarget = document.getElementById(modalId);
    document.body.classList.add('modal-open');
    openTarget.classList.add('is-active'); 
}
// modal 닫기
const closeModal = event => {
    _this = event.target;
    activeModel = _this.closest('.modal__wrap--bg');
    activeModel.classList.add('fade-out');
    setTimeout(() => {
        activeModel.classList.remove('is-active');
        activeModel.classList.remove('fade-out');
        document.body.classList.remove('modal-open');
    },300);    
}

// type check
const countBytes = text => {
    return [...text].reduce((byteLength, char) => {
        const charCode = char.charCodeAt(0);
        byteLength += charCode <= 0x007f ? 1 : charCode <= 0x07ff ? 2 : 3;
        return byteLength;
    }, 0);
};

// 입력제한 체크
const checkCharacterCount = () => {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', (event) => {
            const maxLength = parseInt(textarea.getAttribute('maxlength'));
            let text = textarea.value;
            if (text.length > maxLength) {            
                event.preventDefault();
                return;
            }
            const byteLength = countBytes(text);
            textarea.nextElementSibling.querySelector('span').textContent = byteLength;
        });
    });    

    // 페이지 로드 시에도 한 번 실행합니다.
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('maxlength'));
        let text = textarea.value;
        const byteLength = countBytes(text);
        textarea.nextElementSibling.querySelector('span').textContent = byteLength;
    });
};

window.addEventListener('load', checkCharacterCount);

// 메시지 확인 모달
const confirmMsg = event => {
    _this = event.target;
    _thisParent = _this.parentNode.parentNode.parentNode;
    modalId = _this.getAttribute('modal-id');
    openTarget = document.getElementById(modalId);    
    openTarget.classList.add('is-active'); 
    document.body.classList.add('modal-open');    
}

// 삭제 이벤트
const deleteRow = (rowElement) => {     
    const activeModal = document.querySelector('.modal__wrap--bg.is-active');
    activeModal && activeModal.classList.remove('is-active');
    rowElement.remove();
    document.body.classList.remove('modal-open');
};

// 모달창 영역 외를 클릭하면 드랍다운 닫기
document.addEventListener("click", function(e) {    
    if (e.target.classList.contains('modal__wrap--bg')) {
        const activeModal = document.querySelector('.modal__wrap--bg.is-active');
        activeModal.classList.remove('is-active');
        document.body.classList.remove('modal-open');
    }
});

const clearButton = document.getElementById('address-form');
clearButton.addEventListener('input', () => {
    document.querySelector('.btn-icon-clear-value').classList.remove('hide');
})
