<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function create(Request $request){
      $category = new Category();
      $category->category_sort_num = 1;
      $category->category_name = $request->categoryName;
      $category->save();
      return $category;
    }

    public function delete(Request $request){
      $category = Category::findOrFail($request->id);
      $category->delete();
      return $request;
    }
}
