<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
class ProductController extends Controller
{
    public function list()
    {
        $products = Product::query()->limit(10)->offset(0)->orderBy('id', 'desc')->get();
        return response()->json($products);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'color' => 'required|numeric',
            'category' => 'required|numeric',
            'price' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]
            );
        }
        else
        {
            $insert = new Product();
            $insert->name = $request->post('name');
            $insert->color = $request->post('color');
            $insert->category = $request->post('category');
            $insert->price = $request->post('price');
            $insert->save();
            return response()->json(array('success' => 'Product Saved...'));
        }
    }

    public function edit($id)
    {
        if($id)
        {
            $result = Product::find($id);
            return response()->json($result);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'color' => 'required|numeric',
            'category' => 'required|numeric',
            'price' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]
            );
        }
        else
        {
            $update = Product::find($request->post('id'));
            $update->name = $request->post('name');
            $update->color = $request->post('color');
            $update->category = $request->post('category');
            $update->price = $request->post('price');
            $update->save();
            return response()->json(array('success' => 'Product Saved...'));
        }
    }

    public function delete(Request $request)
    {
        if($request->post('productid'))
        {
            $delete = Product::find($request->post('productid'));
            $delete->delete();
            return response()->json(array('success' => 'Product Deleted'));
        }
        else
        {
            return response()->json(array('error' => 'Product not deleted'));
        }
    }
}
