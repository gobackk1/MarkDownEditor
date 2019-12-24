<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CategoryLarge;
use App\Category;
use App\Memo;

class ApiController extends Controller
{
    //
    public function index(){
      $items = [
        'category' => Category::all(),
        'memo' => Memo::all()
      ];
      $json = json_encode($items);
      return $json;
    }
}
