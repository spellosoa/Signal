function create_canvas(){
    var texts = [
        '텍스트',
        '텍스',
        '텍',
        '텍ㅁㅁㅁㅁㅁㅁ',
        '텍ㄴㄴㄴㄴㄴ'
        ];
    class TextElement {
        constructor(text, x, y, width, height) {
            this.text = text;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speedX = Math.random() * 2 - 1; // X축 이동 속도 (-1 ~ 1)
            this.speedY = Math.random() * 2 - 1; // Y축 이동 속도 (-1 ~ 1)
        }

        update() {
            if(!this.isStopped){
                this.x += this.speedX;
                this.y += this.speedY;
            }
            // 캔버스 경계 체크
            if (this.x < 0 || this.x+this.width > canvas.width) {
                this.speedX *= -1; // 이동 방향 변경
            }
            if (this.y-this.height < 0 || this.y > canvas.height) {
                this.speedY *= -1; // 이동 방향 변경
            }
            for (let i = 0; i < textElements.length; i++) {
                const otherElement = textElements[i];
                if (otherElement !== this) {
                    if (this.checkCollision(otherElement)) {
                        this.reverseDirection();
                        otherElement.reverseDirection();
                    }
                }
            }
        }   
        draw() {
            ctx.fillText(this.text, this.x, this.y);
        }
        stop() {
            this.isStopped = true;
        }

        resume() {
            this.isStopped = false;
        }
        checkCollision(otherElement) {
            return (
                this.x < otherElement.x + otherElement.width &&
                this.x + this.width > otherElement.x &&
                this.y < otherElement.y + otherElement.height &&
                this.y + this.height > otherElement.y
            );
        }
        reverseDirection() {
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }

    // 요소의 크기를 가져와서 캔버스 크기로 설정
    var canvas = document.getElementById('textCanvas');
    var ctx = canvas.getContext('2d');
    var canvasContainer = $('.canvas-container');
    var canvas = document.getElementById('textCanvas');
    var containerWidth = canvasContainer.width();
    var containerHeight = canvasContainer.height();
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // 캔버스 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var textElements = [];

    // 텍스트 스타일 설정
    var fontSize = Math.min(containerWidth, containerHeight) / 10;
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = '#000';

    // 텍스트 그리기
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var textSpacing = fontSize * 1.5; // 텍스트 간격 조정
    var startY = centerY - (texts.length - 1) * textSpacing / 2;
    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        var textWidth = ctx.measureText(text).width;
        var textHeight = parseInt(ctx.font)
        var textX = centerX - textWidth / 2;
        var textY = startY + i * textSpacing;
        var textElement = new TextElement(text, textX, textY, textWidth, textHeight);
        textElements.push(textElement);
        ctx.fillText(text, textX, textY);
    }

    animate();


function getRandomValue(maxValue) {
    return Math.random() * maxValue;
}

// 애니메이션 루프 함수
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 각 텍스트 요소 업데이트 및 그리기
    for (let i = 0; i < textElements.length; i++) {
        const textElement = textElements[i];
        textElement.update();
        textElement.draw();
    }
    requestAnimationFrame(animate);

}

  canvas.addEventListener('mousemove', function(event) {
	canvas.style.cursor = 'default'
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    for (let i = 0; i < texts.length; i++) {
        const textElement = textElements[i];

        // 텍스트의 경계 영역 계산
        const textWidth = ctx.measureText(textElement.text).width;
        const textHeight = parseInt(ctx.font); // 폰트 높이 추출 (추후 수정 필요)
        const textLeft = textElement.x;
        const textRight = textElement.x + textWidth;
        const textTop = textElement.y - textHeight;
        const textBottom = textElement.y;

        // 마우스 좌표와 텍스트 경계 영역 비교
        if (
            mouseX >= textLeft &&
            mouseX <= textRight &&
            mouseY >= textTop &&
            mouseY <= textBottom
        ) {
			canvas.style.cursor = 'pointer'
            textElement.stop();
        } else {
            textElement.resume();
        }
    }
});
canvas.addEventListener('click', function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // 텍스트 요소 선택
    for (let i = 0; i < textElements.length; i++) {
        const textElement = textElements[i];

        // 텍스트의 경계 영역 계산
        const textWidth = ctx.measureText(textElement.text).width;
        const textHeight = parseInt(ctx.font); // 폰트 높이 추출 (추후 수정 필요)
        const textLeft = textElement.x;
        const textRight = textElement.x + textWidth;
        const textTop = textElement.y - textHeight;
        const textBottom = textElement.y;

        // 마우스 좌표와 텍스트 경계 영역 비교
        if (
            mouseX >= textLeft &&
            mouseX <= textRight &&
            mouseY >= textTop &&
            mouseY <= textBottom
        ) {
            // 새로운 페이지로 이동
            window.location.href = '새로운페이지주소.html';
            break;
        }
    }
});
}
create_canvas();
  // 윈도우 크기 변경 시 캔버스 크기 재설정 및 다시 그리기
$(window).on('resize', function() {
    create_canvas();
});
  