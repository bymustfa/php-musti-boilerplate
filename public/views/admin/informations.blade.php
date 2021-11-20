@extends('admin.components.layouts.layout')
@push('css')
    <link rel="stylesheet" href="{{assetAdmin('plugins/summernote/summernote-bs4.css')}}">

@endpush
@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid pt-2">
                <form action="{{base_url('api/information/update')}}" id="form">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card m-b-30">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h4 class="mt-0 header-title">Ön Bilgi ve Mesafeli Satış Sözleşmesi</h4>
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
                                                    <div class="col-md-6 p-2 form-group">

                                                        <div class="card">
                                                            <div class="card-header">Ön Bilgi  <small>({{$language->language_name}})</small> </div>
                                                            <div class="card-body">
                                                                       <textarea class="information"
                                                                                 name="distance_content" required
                                                                                 data-lang="{{$language->short_code}}">{!! json_decode(\App\Models\PreliminaryInformation::find(1)->distance_content, true)[$language->short_code] !!}
                                                                            </textarea>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-md-6 p-2 form-group">

                                                        <div class="card">
                                                            <div class="card-header">Mesafeli Satış Sözleşmesi <small>({{$language->language_name}})</small></div>
                                                            <div class="card-body">
                                                   <textarea class="information"
                                                             name="preli_content" required
                                                             data-lang="{{$language->short_code}}">{!! json_decode(\App\Models\PreliminaryInformation::find(1)->preli_content, true)[$language->short_code] !!}
                                                        </textarea>
                                                            </div>
                                                        </div>

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
        $(".information").summernote({
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


        $("#form").submit(function (e) {
            e.preventDefault();

            let formElement = $(this);

            const distance_content = {}
            $('[name="distance_content"]').each((i, e) => {
                distance_content[$(e).data('lang')] = $(e).val()
            })

            const preli_content = {}
            $('[name="preli_content"]').each((i, e) => {
                preli_content[$(e).data('lang')] = $(e).val()
            })

            const saveData = {
                'distance_content': JSON.stringify(distance_content),
                "preli_content": JSON.stringify(preli_content)
            }

            let url = formElement.attr("action")

            $.post(url, saveData, function (response) {
                if (response.status) {
                    alertify.success(response.message);
                } else {
                    alertify.error(response.message);
                }
            });

        });
    </script>

@endpush