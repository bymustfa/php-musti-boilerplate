@extends('admin.components.layouts.layout')
<?php $site_infos = site_infos() ?>
@push('css')
    <style>
        #changeImage {
            cursor: pointer;
            position: relative;
        }
    </style>

@endpush

@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid">
                <div class="page-title-box">
                    <div class="row align-items-center">
                        <div class="col-sm-6">
                            <h4 class="page-title">Genel Ayarlar</h4>
                        </div>

                    </div>
                </div>


                <div class="p-3 border rounded bg-white mb-3">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h3>Site Ayarları</h3>
                        </div>
                    </div>
                    <form id="generalForm" enctype="multipart/form-data">

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Site Adı:</label>
                                <input type="text" placeholder="Site Adı" name="site_name" class="form-control"
                                       required value="{{$site_infos->site_name}}"/>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Site Slogan:</label>
                                <input type="text" placeholder="Site Slogan" name="site_slogan" class="form-control"
                                       required value="{{$site_infos->site_slogan}}"/>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h5>Logo</h5>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Mevcut Logo:</label><br>
                                        <div class="text-center border rounded p-2">
                                            <img src="{{json_decode($site_infos->logo, true)['original']}}" width="50%">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <label>Yeni Logo:
                                            <smal>(Logoyu Değiştirmek İstemediğinizde Boş Bıtakın)</smal>
                                        </label><br>
                                        <div class="text-center">

                                            <label id="changeImage" class="border rounded p-2">
                                                <input type="file" style="display: none" class="form-control"
                                                       id="tmpImg" name="logo" accept="image/*">
                                                <img id="refImg" height="150px" src="{{static_folder('upload.png')}}">
                                            </label>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <button class="waves-button btn btn-success" type="submit">Ayarları Kaydet</button>
                            </div>
                        </div>


                    </form>
                </div>


            </div>


        </div>


        @include('admin.components.Blades.bottom-text')

    </div>

@endsection

@push('js')

    <script>
        $('#tmpImg').change(function () {
            const file = $(this).prop('files')
            let reader = new FileReader();
            reader.onloadend = function () {
                $("#refImg").attr("src", reader.result)
            };
            reader.readAsDataURL(file[0]);
        })


        $('#generalForm').submit(function (e) {
            e.preventDefault();
            const formElement = $(this)
            formElement
                .find('button[type="submit"]')
                .prop("disabled", false)
                .text("Lütfen Bekleyin");


            const formData = new FormData(this)

            const url = BASE_URL + 'api/general/update'
            console.log(url)
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: function (response) {
                    console.log(response);
                    if (response.status) {
                        alertify.success(response.message);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        alertify.error(response.message);
                        formElement
                            .find('button[type="submit"]')
                            .prop("disabled", false)
                            .text("Ayarları Kaydet");
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
            });


        })
    </script>
@endpush

