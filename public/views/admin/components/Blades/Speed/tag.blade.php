<div class="modal fade TagSpeedModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title mt-0" id="mySmallModalLabel">Etiket Ekle</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="{{base_url('api/tags/speedAdd')}}" id="TagSpeedForm">
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label>Etiket Adı</label>
                            <input type="text" name="name" class="form-control" required placeholder="Etiket Adı">
                        </div>

                        <div class="col-md-12 text-center">
                            <button type="submit" class="btn btn-success waves-effect waves-light col-12">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>