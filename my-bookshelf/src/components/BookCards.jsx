import React from 'react';

export const BookCardData = [
    {id: 1, title: "雨の日だけ見える街", author: "佐倉美月", rating: "★★★★★", comment: "不思議で切ない物語"},
    {id: 2, title: "明日の自分に会いに行く", author: "水野透", rating: "★★★★★", comment: "共感できる青春小説"},
    {id: 3, title: "星を拾う夜", author: "小川凛", rating: "★★★★★", comment: "優しくて読みやすい作品"}
];

function BookCards({ title, author, rating, comment }) {
    return (
        <div className="p-4 border rounded shadow mb-4 bg-white">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <h3 className="text-base text-gray-700">{author}</h3>
            <h3 className="text-green-600">{rating}</h3>
            <p className="text-base text-gray-900">{comment}</p>
        </div>
    );
}

export default BookCards; 