<!DOCTYPE html>
<html>
<head>
    <title>Laravel 9 Image Upload Example Tutorial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <div class="card">
        <div class="card-header text-center">
            <h2>Laravel 9 Image Upload Example Tutorial - Tuts-Station.com</h2>
        </div>
        <div class="card-body">
            @if ($message = Session::get('success'))
                <div class="alert alert-success alert-dismissible fade show mb-2" role="alert">
                    {{ $message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <img src="images/{{ Session::get('image') }}" class="mb-2" style="width:400px;height:200px;">
            @endif

            <form action="{{ route('image.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <div class="mb-3">
                    <label class="form-label" for="inputImage">Select Image : <span class="text-danger">*</span></label>
                    <input
                        type="file"
                        name="image"
                        id="inputImage"
                        class="form-control @error('image') is-invalid @enderror">

                    @error('image')
                    <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>

                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary">Upload</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
