<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>Panel Giriş</title>
    <meta content="Mustafa ÖZTĞRK" name="author"/>
    <link rel="shortcut icon" href="{{assetAdmin('assets/images/favicon.ico')}}">

    <link href="{{assetAdmin('assets/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{assetAdmin('assets/css/metismenu.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{assetAdmin('assets/css/icons.css')}}" rel="stylesheet" type="text/css">
    <link href="{{assetAdmin('assets/css/style.css')}}" rel="stylesheet" type="text/css">

</head>

<body>

<!-- Begin page -->
<div class="accountbg"></div>

<div class="wrapper-page">
    <div class="card card-pages shadow-none">

        <div class="card-body">

            <h5 class="font-18 text-center">Panele Giriş Yap</h5>

            <form class="form-horizontal m-t-30" action="{{admin_url('login')}}" method="POST">
                @include('admin.components.Blades.alert', ['time' => 5000])
                <div class="form-group">
                    <div class="col-12">
                        <label>Kullanıcı Adı</label>
                        <input class="form-control" autofocus autocomplete="off" type="text" required name="user_name"
                               placeholder="Kullanıcı Adı">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-12">
                        <label>Şifre</label>
                        <input class="form-control" autocomplete="off" type="password" name="password" required
                               placeholder="Şifre">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-12">
                        <div class="checkbox checkbox-primary">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" name="remember_me" class="custom-control-input"
                                       id="customCheck1">
                                <label class="custom-control-label" for="customCheck1"> Beni Hatırla</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group text-center m-t-20">
                    <div class="col-12">
                        <button class="btn btn-primary btn-block btn-lg waves-effect waves-light" type="submit">
                            Giriş Yap
                        </button>
                    </div>
                </div>

            </form>
        </div>

    </div>
</div>
<!-- END wrapper -->

<!-- jQuery  -->
<script src="{{assetAdmin('assets/js/jquery.min.js')}}"></script>
<script src="{{assetAdmin('assets/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{assetAdmin('assets/js/metismenu.min.js')}}"></script>
<script src="{{assetAdmin('assets/js/jquery.slimscroll.js')}}"></script>
<script src="{{assetAdmin('assets/js/waves.min.js')}}"></script>

<!-- App js -->
<script src="{{assetAdmin('assets/js/App.js')}}"></script>

</body>

</html>