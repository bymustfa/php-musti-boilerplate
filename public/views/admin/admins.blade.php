@extends('admin.components.layouts.layout')

@push('css')
    @include('admin.components.Blades.Datables.css')
    <link rel="stylesheet" href="{{assetAdmin('assets/css/admins.css')}}">
@endpush

@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid pt-2">
                <div class="row">
                    <div class="col-12">
                        <div class="card m-b-30">
                            <div class="card-body">

                                <div class="d-flex justify-content-between align-items-center">
                                    <h4 class="mt-0 header-title">Yetkililer</h4>
                                    <button class="btn btn-success waves-effect waves-light"
                                            data-toggle="modal"
                                            data-target=".AdminAddModal">
                                        <i class="fas fa-plus"></i> Yeni Ekle
                                    </button>
                                </div>

                                <table id="dataTable" data-url="{{base_url('api/admins/table/')}}"
                                       class="table table-striped table-bordered dt-responsive nowrap"
                                       style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                </table>

                                <div class="d-flex justify-content-between align-items-center px-3">
                                    <div><p id="tableInfo"></p></div>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination" id="pagination"></ul>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @include('admin.components.Blades.bottom-text')
    </div>

    <div class="modal fade AdminAddModal" tabindex="-1" role="dialog" aria-labelledby="AdminAddModal"
         aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mt-0" id="CategoryAddModal">Yetkili işlemi</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="adminForm">
                        <input type="hidden" name="id" value="0">

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label> E-posta: </label>
                                <input type="email" placeholder="E-posta" name="email" required class="form-control">
                            </div>
                            <div class="col-md-6 form-group">
                                <label> Ad ve Soyad: </label>
                                <input type="text" placeholder="Ad ve Soyad" name="name" required class="form-control">
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-12 form-group">
                                <label> Kullanıcı Adı: </label>
                                <input type="text" placeholder="Kullanıcı Adı" name="user_name" required class="form-control">
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label> Şifre: </label>
                                <input type="password" placeholder="Şifre" name="password1" required
                                       class="form-control">
                            </div>

                            <div class="col-md-6 form-group">
                                <label> Şifre Tekrar: </label>
                                <input type="password" placeholder="Şifre Tekrar" name="password2" required
                                       class="form-control">
                            </div>
                        </div>

                        <div class="row" style="display: none">
                            <div class="col-md-12 form-group">
                                <label> Kullanıcı Resimi: </label>
                                <div class="row">
                                    <label class="col-md-4 mx-auto border rounded bg-light p-1 text-center"
                                           id="imgUploadArea">
                                        <input type="file" id="image" class="form-control" accept="image/*">
                                        <img id="src" data-src="{{assetAdmin('assets/images/user-img-load.svg')}}" width="100%"
                                             src="{{assetAdmin('assets/images/user-img-load.svg')}}">
                                        <input type="hidden" name="image" value="">
                                    </label>
                                </div>

                            </div>
                        </div>


                        <div class="row pt-3">
                            <div class="col-md-12 text-center">
                                <button class="btn btn-lg btn-success waves-effect waves-light">
                                    <i class="fas fa-save mr-2"></i>
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </form>


                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

@endsection




@push('js')
    @include('admin.components.Blades.Datables.js')
    <script src="{{assetAdmin('assets/js/Partials/Admins.js')}}"></script>
@endpush