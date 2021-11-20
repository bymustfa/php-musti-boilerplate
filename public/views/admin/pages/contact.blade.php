@extends('admin.components.layouts.layout')

@push('css')
    <link rel="stylesheet" href="{{assetAdmin('assets/css/remixicon.css')}}">
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="{{assetAdmin('/plugins/morris/morris.css')}}">
    <style>
        #changeImage {
            cursor: pointer;
            position: relative;
        }

        #changeImage:hover:after {
            content: 'Resmi Değiştir';
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            background: #000;
            padding: 4px;
            color: white;
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
                            <h4 class="page-title">İletişim</h4>
                        </div>

                    </div>
                </div>


                <div class="row">
                    <div class="col-md-12 bg-white p-3 border rounded">

                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Kişi Adı</th>
                                    <th scope="col">Telefon</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Görsel</th>
                                    <th scope="col" width="205px">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach(\App\Models\InfoUsers::where(['status' => 1])->get() as $user)

                                    <tr>
                                        <td>{{$user->user_name}}</td>
                                        <td>{{$user->user_phone}}</td>
                                        <td>{{$user->user_email}}</td>
                                        <td>
                                            <img width="55px"
                                                 src="{{isset($user->user_image)? base_url(json_decode($user->user_image, true)['small']) : "https://via.placeholder.com/150"}}">
                                        </td>
                                        <td>
                                            <button class="btn waves-effect btn-success btnEdit"
                                                    data-id="{{$user->id}}">
                                                <i class="fas fa-edit mr-2"></i>
                                                Düzenle
                                            </button>
                                        </td>
                                    </tr>

                                @endforeach

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <hr>

                <div class="row">
                    <div class="col-md-12 bg-white p-3 border rounded">
                        <label>Adres:</label>
                        <textarea class="form-control" id="addresArea" rows="4">{{site_infos()->site_addres}}</textarea>
                        <div class="text-right">
                            <button class="btn waves-effect btn-success " id="btnAddresEdit">Adresi Güncelle</button>
                        </div>

                    </div>
                </div>


            </div>


        </div>


        @include('admin.components.Blades.bottom-text')

    </div>




    <div class="modal fade UserModal" tabindex="-1" role="dialog" aria-labelledby="UserModal"
         aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <form id="UserForm" enctype="multipart/form-data" class="modal-content ">

                <div class="modal-header">
                    <h5 class="modal-title" id="UserModal">Kişi</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modal_body"></div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Kaydet</button>
                </div>
            </form>
        </div>
    </div>

@endsection

@push('js')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
    <script src="{{assetAdmin('assets/js/remixicon-datas.js')}}"></script>
    <script>

        $('.btnEdit').click(function () {
            const id = $(this).data('id');
            $.get(BASE_URL + 'api/contact-users/get/' + id, function (response) {
                console.log(response)
                const {user, socials} = response
                const img = JSON.parse(user.user_image)


                let html = `
                    <div class="row">
                        <div class="form-group col-md-12">
                           <div class="col-md-12 form-group text-center">
                                <label>Resim:</label><br>
                               <label id="changeImage" class="border rounded p-2">
                                    <input type="file" style="display: none" class="form-control" id="tmpImg" name="image" accept="image/*">
                                    <img id="refImg" height="100px" src="${BASE_URL + img.original}" >
                                </label>
                            </div>
                        </div>

                        <div class="form-group col-md-12">
                            <label>Ad ve Soyad:</label>
                            <input type="text" class="form-control" name="user_name" placeholder="Ad ve Soyad" value="${user.user_name}" required />
                        </div>

                        <div class="form-group col-md-6">
                            <label>E-Posta:</label>
                            <input type="email" class="form-control" name="user_email" placeholder="E-Posta" value="${user.user_email}" required />
                        </div>

                        <div class="form-group col-md-6">
                            <label>Telefon:</label>
                            <input type="text" class="form-control" name="user_phone" placeholder="Telefon" value="${user.user_phone}" required />
                        </div>

                        <div class="form-group col-md-12">
                            <label>Linkedin Linki:</label>
                            <input type="text" class="form-control" name="social_link" placeholder="Linkedin Linki" value="${socials[0].social_link}" required />
                        </div>

                        <input type="hidden" name="id" value="${id}">

                    </div>`;

                $('#modal_body').html(html)
                $('#selectpicker').selectpicker();
                $('.UserModal').modal('show')


                $('#tmpImg').change(function () {
                    const file = $(this).prop('files')
                    let reader = new FileReader();
                    reader.onloadend = function () {
                        $("#refImg").attr("src", reader.result)
                    };
                    reader.readAsDataURL(file[0]);
                })


            });
        })


        $('#UserForm').submit(function (e) {
            e.preventDefault();

            const formElement = $(this)
            const formData = new FormData(this)

            const url = BASE_URL + 'api/contact-users/update'
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
                            .text("Kaydet");
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
            });


        })


        $('#btnAddresEdit').click(function () {
            const addres = $('#addresArea').val().trim()
            if (addres.length > 0) {
                $.post(BASE_URL + "api/contact/addres-update", {addres: addres}, function (response) {
                    if (response.status) {
                        alertify.success(response.message);
                    } else {
                        alertify.error(response.message);
                    }
                });
            } else {
                alertify.error("Adres Alanını Boş Bırakmayınız");
            }
        })

    </script>

@endpush

