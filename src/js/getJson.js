<script>
        $(document).ready(function(){

            console.log(1111)

                    $.getJSON('data.json',function(data){

                        console.log(222)



                    var mediahtml="";

                    $.each(data,function(i,data) {



                    mediahtml+='<div class="media">'+
                    '<div class="media-left">'+
                    '<a data-toggle="modal" data-target="#myModal">'+
                    '<img class="media-object" src="'+data["imgsrc"]+
                    '" alt="">'+
                        '</a>'+'</div>'+
                        '<div class="media-body">'+
                        '<div class="title">'+
                            '<span class="classify">'+
                                data["classify"]+
                            '</span>'+
                            '<span class="titlename media-heading">'+
                                data['titlename']+
                            '</span>'+
                        '</div>'+
                        '<span class="time">'+
                            '<span class="glyphicon glyphicon-time"></span> '+
                            '<span>'+data['pubdate']+'</span>'+
                        '<p>'+data["intro"]+'</p>'+
                        '<div class="guest">'+
                            '<span class="jia">嘉</span>'+
                            '<span class="name">'+data["name"]+'</span>'+
                            '<span class="position">'+data["position"]+'</span>'+
                            '<span class="glyphicon glyphicon-eye-open"></span>'+
                            '<span class="click-rite"></span>'+
                        '</div>'+
                    '</div>'+

                    '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
                        '<div class="modal-dialog" role="document">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                        '<span aria-hidden="true">&times;</span>'+
                                    '</button>'+
                                '</div>'+
                                '<div class="modal-body"></div>'+
                        '</div>'+
                    '</div>'+
                    '</div>'




//                  var url_mobi=data.url_mobi;
//                  var url_pc=data.url_pc;
//                  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
//                          $('.modal-body').prepend(url_mobi);
//                          }else{
//                          $('.modal-body').prepend(url_pc);
//                          }
//                          
//                          
                            })

                    $('.medialist').after(mediahtml);  


                })


                })



                $('#myModal').on('shown.bs.modal', function (e) {
                    // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零  
                    $(this).css('display', 'block');
                    var modalHeight = $(window).height() / 2 - $('#myModal .modal-dialog').height() / 2;
                    $(this).find('.modal-dialog').css({
                        'margin-top': modalHeight
                    });
                });


                //点击预览图时判断
//              $('.modal').on('click', function () {
//                  if ($('#myModal').css("display") == "none") {
//                      $('.modal-body').children('iframe').attr('src', '');
//                  } else {
//                      $('.modal-body').children('iframe').attr('src',
//                          'https://v.qq.com/iframe/player.html?vid=v0508nqkm75&tiny=0&auto=0');
//                  }
//              })

    </script>