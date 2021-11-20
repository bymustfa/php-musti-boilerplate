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
                                    <h4 class="mt-0 header-title">Mesajlar</h4>
                                </div>

                                <table id="dataTable" data-url="{{base_url('api/messages/table/')}}"
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

    <div class="modal fade MessageReadModal" tabindex="-1" role="dialog" aria-labelledby="CategoryAddModal"
         aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mt-0" id="CategoryAddModal">Mesaj</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="messageArea"></div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

@endsection


@push('js')
    @include('admin.components.Blades.Datables.js')
    <script src="{{assetAdmin('assets/js/Partials/Messages.js')}}"></script>

@endpush