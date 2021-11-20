</div>
<!-- END wrapper -->
<!-- jQuery  -->
<script>
    const BASE_URL = "{{base_url()}}";
    const ADMIN_ASSETS = BASE_URL + "public/views/admin/components/";
</script>
<script src="{{assetAdmin('assets/js/jquery.min.js')}}"></script>
<script src="{{assetAdmin('assets/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{assetAdmin('assets/js/metismenu.min.js')}}"></script>
<script src="{{assetAdmin('assets/js/jquery.slimscroll.js')}}"></script>
<script src="{{assetAdmin('assets/js/waves.min.js')}}"></script>
<script src="{{assetAdmin('plugins/moment/moment.js')}}"></script>

<script src="{{assetAdmin('plugins/moment/moment-with-locales.min.js')}}"></script>
<script src="{{assetAdmin('plugins/alertify/js/alertify.js')}}"></script>
<script src="{{assetAdmin('plugins/sweet-alert2/sweetalert2.min.js')}}"></script>
<script src="{{assetAdmin('plugins/summernote/summernote-bs4.min.js')}}"></script>
<script src="{{assetAdmin('plugins/select2/select2.full.min.js')}}"></script>
<script src="{{assetAdmin('plugins/select2/i18n/tr.js')}}"></script>
<script src="{{assetAdmin('plugins/swichery/switchery.min.js')}}"></script>
<script>  moment.locale("tr");</script>
<script src="{{assetAdmin('plugins/parsleyjs/parsley.min.js')}}"></script>

<!-- App js -->
<script src="{{assetAdmin('assets/js/app.js')}}"></script>

@stack('js')
</body>

</html>