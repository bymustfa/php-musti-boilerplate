@extends('admin.components.layouts.layout')
@push('css')
    <link rel="stylesheet" href="{{assetAdmin('plugins/summernote/summernote-bs4.css')}}">

@endpush
@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid pt-2">


                <div class="row">
                    <div class="col-md-12">
                        <div class="card m-b-30">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4 class="mt-0 header-title">Sıkça Sorulan Sorular</h4>
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

                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-header form-group">
                                                        <label>Soru Başlığı</label>
                                                        <input type="text" name="title"
                                                               data-lang="{{$language->short_code}}"
                                                               placeholder="Soru Başlığı"
                                                               class="form-control">
                                                    </div>
                                                    <div class="card-body">
                                                        <textarea class="form-control" name="answer"
                                                                  data-lang="{{$language->short_code}}"
                                                                  rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <?php $lnNum++ ?>
                                    @endforeach
                                </div>

                                <div class="text-center">
                                    <button class="btn btn-success" id="faq_save">Kaydet</button>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>


                <div class="row">
                    <div class="col-md-12 bg-white p-3">

                        <ul class="nav nav-pills nav-justified" role="tablist">
                            <?php $lnNum = 1; ?>
                            @foreach( \App\Models\Language::all() as $language )
                                <li class="nav-item waves-effect waves-light border">
                                    <a class="nav-link {{$lnNum == 1 ? 'active' : "" }} "
                                       data-toggle="tab"
                                       href="#tab_lan_{{$language->iso_code}}_{{$language->iso_code}}" role="tab"
                                       aria-selected="true">
                                        <span class="d-none d-md-block">{{$language->language_name}}</span>
                                    </a>
                                </li>
                                <?php $lnNum++; ?>
                            @endforeach
                        </ul>

                        <div class="tab-content border">
                            <?php $lnNum = 1;
                            foreach (\App\Models\Language::all() as $language) {  ?>
                            <div class="tab-pane p-3 {{$lnNum == 1 ? 'active' : "" }}"
                                 id="tab_lan_{{$language->iso_code}}_{{$language->iso_code}}" role="tabpanel">
                                <div id="accordion">

                                    <?php
                                    $faqs = \App\Models\Faq::where(['faq_status' => 1])->get();
                                    $number = 1;
                                    foreach ($faqs as $faq) { ?>
                                    <div class="card mb-2">
                                        <div class="card-header" id="heading<?=$number?>">
                                            <h5 class="mb-0 mt-0 font-14">
                                                <a data-toggle="collapse" data-parent="#accordion"
                                                   href="#collapse<?=$number?>"
                                                   aria-expanded="true" aria-controls="collapseOne"
                                                   class="text-dark">
                                                    {{json_decode($faq->faq_title, true)[ $language->short_code]}}
                                                </a>
                                            </h5>
                                        </div>

                                        <div id="collapse<?=$number?>" class="collapse"
                                             aria-labelledby="heading<?=$number?>"
                                             data-parent="#accordion">
                                            <div class="card-body">
                                                {!! json_decode($faq->faq_content, true)[ $language->short_code] !!}
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                        $number++;
                                    } ?>

                                </div>
                            </div>
                            <?php
                            $lnNum++;
                            }
                            ?>


                        </div>
                    </div>


                </div>
            </div>
        </div>


        @include('admin.components.Blades.bottom-text')



        @endsection


        @push('js')
            <script>
                $("textarea").summernote({
                    placeholder: "Cevap",
                    height: 150,
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


                $('#faq_save').click(function () {
                    const titles = {};
                    const answers = {};

                    $('[name="title"]').each((i, e) => {
                        titles[$(e).data('lang')] = $(e).val()
                    })

                    $('[name="answer"]').each((i, e) => {
                        answers[$(e).data('lang')] = $(e).val()
                    })

                    const formData = new FormData()


                    formData.append('faq_title', JSON.stringify(titles))
                    formData.append('faq_content', JSON.stringify(answers))


                    const url = BASE_URL + "api/faq/add"
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: formData,
                        success: function (response) {
                            if (response.status) {
                                alertify.success(response.message);
                                setTimeout(() => window.location.reload(), 2000)
                            } else {
                                alertify.error(response.message);
                            }
                        },
                        cache: false,
                        contentType: false,
                        processData: false,
                    });

                })

            </script>

    @endpush