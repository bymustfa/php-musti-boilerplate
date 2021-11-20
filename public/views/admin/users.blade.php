@extends('admin.components.layouts.layout')
@push('css')
    @include('admin.components.Blades.Datables.css')
    <link rel="stylesheet" href="{{assetAdmin('plugins/image-uploader/dist/image-uploader.css')}}">
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
                                    <h4 class="mt-0 header-title">Üyeler</h4>
                                </div>

                                <table id="dataTable" data-url="{{base_url('api/users/table/')}}"
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

    <div class="modal fade UserEditModal" tabindex="-1" role="dialog" aria-labelledby="UserEditModal"
         aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mt-0" id="UserEditModal">Kullanıcı Düzenle</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="{{base_url('api/users/update-user')}}" id="UserUpdateForm">
                        <input type="hidden" value="0" name="id">

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Ad ve Soyad</label>
                                <input type="text" class="form-control" name="user_name" placeholder="Ad ve Soyad"
                                       required>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>E-posta</label>
                                <input type="email" class="form-control" name="user_mail" placeholder="E-posta"
                                       required>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Doğum Tarihi</label>
                                <input type="date" class="form-control" name="user_birth_date"  >
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Cinsiyet</label>
                                <select name="user_male" class="custom-select">
                                    <option value="Henüz Belirtilmedi">Henüz Belirtilmedi</option>
                                    <option value="Erkek">Erkek</option>
                                    <option value="Kadın">Kadın</option>
                                    <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
                                </select>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Telefon</label>
                                <input type="text" class="form-control" placeholder="Telefon" name="user_phone">
                            </div>

                            <div class="col-md-6 form-group">
                                <label>E-Posta Doğrulaması:</label>
                                <div class="p-1 px-2 border bg-light border text-center" id="mailVerification">
                                    asdasd
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-success">Kaydet</button>
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
    <script src="{{assetAdmin('assets/js/Partials/Users.js')}}"></script>
@endpush