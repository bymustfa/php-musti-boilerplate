<!-- Top Bar Start -->
<div class="topbar">

    <!-- LOGO -->
    <div class="topbar-left">
        <a href="{{admin_url()}}" class="logo">
            <span class="logo-light">
                <i class="mdi mdi-camera-control"></i> PANEL
            </span>
            <span class="logo-sm">
                <i class="mdi mdi-camera-control"></i>
            </span>
        </a>
    </div>

    <nav class="navbar-custom">
        <ul class="navbar-right list-inline float-right mb-0">

            <!-- full screen -->
            <li class="dropdown notification-list list-inline-item d-none d-md-inline-block">
                <a class="nav-link waves-effect" href="#" id="btn-fullscreen">
                    <i class="mdi mdi-arrow-expand-all noti-icon"></i>
                </a>
            </li>


            <!-- messages -->
        @include('admin.components.Blades.messages')

        <!-- notification -->
            @include('admin.components.Blades.notifications')


            <li class="dropdown notification-list list-inline-item">
                <div class="dropdown notification-list nav-pro-img">
                    <a class="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown" href="#"
                       role="button" aria-haspopup="false" aria-expanded="false">
                        <img src="{{ strlen($admin_datas->image)? $admin_datas->image : assetAdmin('assets/images/users/user-pp.png')}}"
                             alt="user" class="rounded-circle">
                    </a>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <!-- item-->
                        {{--                        <a class="dropdown-item" href="#"><i class="mdi mdi-account-circle"></i> Profil</a>--}}

                        {{--                        <a class="dropdown-item d-block" href="#">--}}
                        {{--                            <i class="mdi mdi-settings"></i>--}}
                        {{--                            Ayarlar--}}
                        {{--                        </a>--}}
                        {{--                        <div class="dropdown-divider"></div>--}}
                        <a class="dropdown-item text-danger" href="{{admin_url('logout')}}">
                            <i class="mdi mdi-power text-danger"></i>
                            Çıkış Yap
                        </a>
                    </div>
                </div>
            </li>

        </ul>

        <ul class="list-inline menu-left mb-0">
            <li class="float-left">
                <button class="button-menu-mobile open-left waves-effect">
                    <i class="mdi mdi-menu"></i>
                </button>
            </li>

        </ul>

    </nav>

</div>
<!-- Top Bar End -->