@extends('admin.components.layouts.layout')
@push('css')
    <link rel="stylesheet" href="{{assetAdmin('plugins/summernote/summernote-bs4.css')}}">
    <link rel="stylesheet" href="{{assetAdmin('/plugins/morris/morris.css')}}">
    <link rel="stylesheet" href="{{assetAdmin('/assets/css/dashboard.css')}}">
@endpush

<?php $languages = \App\Models\Languages::all(); ?>

@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid">
                <div class="page-title-box">
                    <div class="row align-items-center">
                        <div class="col-sm-12 d-flex align-items-center justify-content-between">
                            <h4 class="page-title">Danışmanlık</h4>

                            <button class="btn waves-effect btn-success " id="content_save">
                                <i class="fas fa-save mr-2"></i> Kaydet
                            </button>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-12 bg-white p-3 border rounded">
                        <ul class="nav nav-pills nav-justified" role="tablist">
                            @foreach( $languages as $language )
                                <li class="nav-item waves-effect waves-light">
                                    <a class="nav-link border {{$language->id == "1"? "active" : ""}}" data-toggle="tab"
                                       href="#lang_tab_{{$language->id}}" role="tab" aria-selected="true">
                                        <span class="d-none d-md-block">
                                           <img src="{{$language->language_flag}}" width="25px" class="mr-1">
                                            {{$language->language_name}}
                                        </span>
                                    </a>
                                </li>
                            @endforeach
                        </ul>

                        <div class="tab-content">

                            @foreach( $languages as $language )
                                <div class="tab-pane p-3 border {{$language->id == "1"? "active" : ""}}"
                                     id="lang_tab_{{$language->id}}" role="tabpanel">
                                    <p class="mb-0">
                                        <textarea lang-id="{{$language->id}}" lang-code="{{$language->short_code}}"
                                                  name="content">{{\App\Models\ConsulancyPage::where(['lang_id' => $language->id])->get()->first()->content}}</textarea>
                                    </p>
                                </div>
                            @endforeach

                        </div>


                    </div>
                </div>


            </div>


        </div>


        @include('admin.components.Blades.bottom-text')

    </div>

@endsection

@push('js')
    <script>
        const langs = [];
        <?php  foreach ( $languages as $item) { ?>
        langs.push({code: '<?=$item->short_code?>', id: '<?=$item->id?>'})
        <?php } ?>

        $("textarea").summernote({
            placeholder: "İçerik",
            height: 300,
            minHeight: null,
            maxHeight: null,
            // callbacks: {
            //     onImageUpload: function (file) {
            //         console.log(file)
            //         let reader = new FileReader();
            //         reader.onloadend = function () {
            //             let image = $("<img>").attr("src", reader.result);
            //             $("textarea").summernote("insertNode", image[0]);
            //         };
            //         reader.readAsDataURL(file[0]);
            //     },
            // },
        });

        $('#content_save').click(function () {
            $('#content_save').text("Lütfen Bekleyin...").prop('disabled', true)
            let contents = [];
            langs.map(lang => {
                contents.push({
                    content: $(`textarea[lang-code="${lang.code}"]`).val(),
                    lang_code: lang.code,
                    lang_id: lang.id
                })
            })
            const saveDatas = {datas: contents}

            $.post("{{base_url('api/pages/consulancy-update')}}", saveDatas, function (response) {
                if (response.status) {
                    alertify.success(response.message);
                } else {
                    alertify.error(response.message);
                }
                $('#content_save').html(`<i class="fas fa-save mr-2"></i> Kaydet`).prop('disabled', false)
            });
        })

    </script>

@endpush

