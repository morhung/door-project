var mlock;
var socket = io('/webclient'); // kêt nối tới server với namespace: webclient
socket.on('connect', function() {
  //cập nhật trạng thái cửa khi bắt đầu kêt nối tới server
  socket.emit('updateTrangThai')
})
socket.on("SVSEND", function(json){ //lắng nghe từ server gửi tới.
  console.log("Nhan data tu server: ", json);
  var status = json.servo_stt; //trạng thái cửa nhận được từ server
  console.log("json.servo_stt: ", status);
  if (status == 1) { // Cửa đóng
    document.getElementById('status_box').innerHTML = "LOCK"
    document.getElementById('second_block_vertical').src = "img/lock.png"
    mlock = true;
  }else{ // Cửa mở
    document.getElementById('status_box').innerHTML = "UNLOCK"
    document.getElementById('second_block_vertical').src= "img/unlock.png"
    mlock = false;
  }
});
$(document).ready(function(){ //Sự kiện khi click vào button
  $('#button').click(function(){
    if (mlock) {
      updateServo(1);
    }else {
      updateServo(0);
    }
  });
})
function updateServo(x){ //Gửi trạng thái điều khiển cửa tới server
  var json = {
    "servo_stt": x
  }
  socket.emit("SERVO", json)
}
