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
                                    <h4 class="mt-0 header-title">Kategoriler</h4>
                                    <button class="btn btn-success waves-effect waves-light" data-toggle="modal"
                                            data-target=".CategoryAddModal"><i class="fas fa-plus"></i> Yeni Ekle
                                    </button>
                                </div>

                                <table id="dataTable" data-url="{{base_url('api/categories/table/')}}"
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

    <div class="modal fade CategoryAddModal" tabindex="-1" role="dialog" aria-labelledby="CategoryAddModal"
         aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mt-0" id="CategoryAddModal">Kategori Ekle</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form id="categoryForm"  action="{{admin_url('category-add')}}" data-update="{{admin_url('category-update')}}" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="id" value="0">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Kategori Adı</label>
                                <input type="text" class="form-control" placeholder="Kategori Adı" name="name" required>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Link
                                    <small>(harici bağlantılar için)
                                        <span style="cursor: pointer" data-toggle="tooltip" data-placement="top"
                                              title="Eğer harici bağlantı yoksa boş bırakınız.">
                                            <i class="fas fa-question"></i>
                                        </span>
                                    </small>
                                </label>
                                <input type="text" class="form-control" placeholder="Link (harici bağlantılar için)"
                                       name="href">
                            </div>

                            <div class="form-group col-md-6">
                                <label>Durum</label>
                                <select name="status" required class="custom-select">
                                    <option value="1">Aktif</option>
                                    <option value="0">Pasif</option>
                                </select>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Anasayfa da Göster
                                    <small>
                                        <span style="cursor: pointer" data-toggle="tooltip" data-placement="top"
                                              title="Anasayfa da yer alan kategoriler bölümü için geçerlidir">
                                            <i class="fas fa-question"></i>
                                        </span>
                                    </small>
                                </label>
                                <select name="home_status" required class="custom-select">
                                    <option value="1">Evet</option>
                                    <option value="0">Hayır</option>
                                </select>
                            </div>
                        </div>



                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-1">Resim Yükle: <input name="image_status" type="checkbox" id="imageUploadStatus" class="switchery" data-size="small" ></div>
                                <div class="input-images"></div>
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-md-12 text-center">
                                <button class="btn btn-lg btn-success waves-effect waves-light"><i class="fas fa-save"></i>
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
<script src="{{assetAdmin('plugins/image-uploader/dist/image-uploader.js')}}"></script>
<script src="{{assetAdmin('assets/js/Partials/Categories.js')}}"></script>

@endpush