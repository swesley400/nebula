export default function Option({ option }: { option: { id: string, text: string, icon: string }}) {
    return (
        <div className="flex items-center p-4 my-2 bg-gray-100 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mr-4">
                {/* Você pode precisar ajustar o tamanho do ícone aqui */}
                <span className="text-2xl">{option.icon}</span>
            </div>
            <div>
                <h2 className="text-gray-800 font-medium">{option.text}</h2>
            </div>
        </div>
    );
}