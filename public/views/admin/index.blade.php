@extends('admin.components.layouts.layout')

@push('css')
    <link rel="stylesheet" href="{{assetAdmin('/plugins/morris/morris.css')}}">
    <link rel="stylesheet" href="{{assetAdmin('/assets/css/dashboard.css')}}">
@endpush

@section('main-content')
    <div class="content-page">

        <div class="content">
            <div class="container-fluid">
                <div class="page-title-box">
                    <div class="row align-items-center">
                        <div class="col-sm-6">
                            <h4 class="page-title">Panel Anasayfası</h4>
                        </div>

                    </div>
                </div>





            </div>


        </div>


        @include('admin.components.Blades.bottom-text')

    </div>

@endsection

@push('js')
    <script src="{{assetAdmin('plugins/morris/morris.min.js')}}"></script>
    <script src="{{assetAdmin('plugins/raphael/raphael.min.js')}}"></script>
    <script src="{{assetAdmin('assets/js/Partials/Dashboard.js')}}"></script>

@endpush

