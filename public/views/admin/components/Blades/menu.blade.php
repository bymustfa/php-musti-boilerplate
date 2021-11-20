<!-- ========== Left Sidebar Start ========== -->
<div class="left side-menu">
    <div class="slimscroll-menu" id="remove-scroll">

        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu" id="side-menu">
                <li class="menu-title">Genel</li>
                <li>
                    <a href="{{admin_url()}}" class="waves-effect">
                        <i class="icon-accelerator"></i>
                        <span> Panel </span>
                    </a>
                </li>

                <li>
                    <a href="{{admin_url('genel')}}" class="waves-effect">
                        <i class="icon-setting-1"></i>
                        <span> Genel Ayarlar </span>
                    </a>
                </li>



                <li>
                    <a href="javascript:void(0);" class="waves-effect">
                        <i class="icon-paper-pen"></i>
                        <span> Sayfalar
                            <span class="float-right menu-arrow">
                                <i class="mdi mdi-chevron-right"></i>
                            </span>
                        </span>
                    </a>
                    <ul class="submenu">
                        <li><a href="{{admin_url('pages/anasayfa')}}"> Anasayfa</a></li>
                        <li><a href="{{admin_url('pages/hakkimizda')}}"> Hakkımızda</a></li>
                        <li>
                            <a href="javascript:void(0);">Hizmetler
                                <span class="float-right menu-arrow">
                                    <i class="mdi mdi-chevron-right"></i>
                                </span>
                            </a>
                            <ul class="submenu">
                                <li><a href="{{admin_url('pages/birlesme')}}">Birleşme ve Satın Alma</a></li>
                                <li><a href="{{admin_url('pages/yapilandirma')}}">Yapılandırma ve Geçici Yön.</a></li>
                                <li><a href="{{admin_url('pages/danismanlik')}}">Danışmanlık</a></li>
                            </ul>
                        </li>
                        <li><a href="{{admin_url('pages/referanslar')}}"> Referanslar</a></li>
                        <li><a href="{{admin_url('pages/iletisim')}}"> İletişim</a></li>
                    </ul>
                </li>


                <li>
                    <a href="{{admin_url('yetkili')}}" class="waves-effect">
                        <i class="mdi mdi-badminton"></i>
                        <span> Yetkililer </span>
                    </a>
                </li>



            </ul>

        </div>
        <!-- Sidebar -->
        <div class="clearfix"></div>

    </div>
    <!-- Sidebar -left -->

</div>
<!-- Left Sidebar End -->