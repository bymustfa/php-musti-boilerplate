@extends('admin.components.layouts.layout')
@push('css')
    <link rel="stylesheet" href="{{assetAdmin('plugins/summernote/summernote-bs4.css')}}">

@endpush
@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid pt-2">
                <form action="{{base_url('api/about/update')}}" id="aboutForm">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card m-b-30">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h4 class="mt-0 header-title">Hakkımızda</h4>
                                        <button type="submit" class="btn btn-success waves-effect waves-light">Kaydet
                                        </button>
                                    </div>
                                    <hr>
                                    <ul class="nav nav-pills nav-justified" role="tablist">
                                        <?php $lnNum = 1; ?>
                                        @foreach( \App\Models\Language::all() as $language )
                                            <li class="nav-item waves-effect waves-light border">
                                                <a class="nav-link {{$lnNum == 1 ? 'active' : "" }} "
                                                   data-toggle="tab"
                                                   href="#tab_lan_{{$language->iso_code}}" role="tab"
                                                   aria-selected="true">
                                                    <span class="d-none d-md-block">{{$language->language_name}}</span>
                                                </a>
                                            </li>
                                            <?php $lnNum++; ?>
                                        @endforeach
                                    </ul>

                                    <div class="tab-content border">
                                        <?php $lnNum = 1; ?>
                                        @foreach( \App\Models\Language::all() as $language )
                                            <div class="tab-pane p-3  {{$lnNum == 1 ? 'active' : "" }}"
                                                 id="tab_lan_{{$language->iso_code}}" role="tabpanel">
                                                <div class="row">
                                                    <div class="col-md-12 form-group">
                                            <textarea class="about"
                                                      name="content" required
                                                      data-lang="{{$language->short_code}}">
                                                {{json_decode(\App\Models\About::find(1)->about_content, true)[$language->short_code]}}
                                            </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php $lnNum++ ?>
                                        @endforeach
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </form>


            </div>
        </div>
    </div>




    @include('admin.components.Blades.bottom-text')



@endsection


@push('js')
    <script>
        $(".about").summernote({
            placeholder: "Hakkımızda",
            height: 450,
            minHeight: null,
            maxHeight: null,
            callbacks: {
                onImageUpload: function (file) {
                    let reader = new FileReader();
                    reader.onloadend = function () {
                        let image = $("<img>").attr("src", reader.result);
                        $("#productDescription").summernote("insertNode", image[0]);
                    };
                    reader.readAsDataURL(file[0]);
                },
            },
        });


        $("#aboutForm").submit(function (e) {
            e.preventDefault();

            let formElement = $(this);

            const datas = {}
            $(".about").each((i,e) =>{
                datas[$(e).data('lang')] =$(e).val()
            })

            const saveData = {'content': JSON.stringify(datas)}

            console.log(saveData)
            let url = formElement.attr("action")

            $.post(url, saveData, function (response) {
                if (response.status) {
                    alertify.success(response.message);
                } else {
                    alertify.error(response.message);
                }
            } );

        });
    </script>

@endpush