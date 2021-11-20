@if($msg = cookie('msg'))
    @php
        $t = isset($time)? $time : 2500
    @endphp
    <div id="msg" class="alert {{$msg->type=='error'? 'alert-danger': 'alert-success'}} alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        {!! $msg->msg  !!}
        <script>
            setTimeout(() => {
                document.querySelector('#msg').style.opacity = 0.6;
            }, {{$t-200}});
            setTimeout(() => {
                document.querySelector('#msg').style.opacity = 0.3;
            }, {{$t-100}});
            setTimeout(() => {
                document.querySelector('#msg').style.display = 'none';
            }, {{$t}});
        </script>
    </div>
@endif