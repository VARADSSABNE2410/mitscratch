import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActionToSprite, deleteAction } from '../redux/spritesSlice.js';
import { Trash } from 'lucide-react';
import { SpriteImage } from './Sprite.js';
import ActionInput from './ActionInput.js';

const MidArea = () => {
  const dispatch = useDispatch();
  const selectedSpriteId = useSelector((state) => state.sprites.selectedSpriteId);
  const selectedSprite = useSelector((state) =>
    state.sprites.sprites.find(sprite => sprite.id === selectedSpriteId)
  );

  const handleDrop = (e) => {
    e.preventDefault();
    const actionType = e.dataTransfer.getData('actionType');
    const actionText = e.dataTransfer.getData('text');
    const payload = JSON.parse(e.dataTransfer.getData('payload'));

    if (selectedSpriteId) {
      dispatch(addActionToSprite({ spriteId: selectedSpriteId, actionType, actionText, payload }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-gray-50 p-6" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl">
        {selectedSprite ? (
          <>
            <div className='flex items-center gap-4 mb-4'>
              <h2 className="text-2xl font-bold text-gray-800">Actions</h2>
              <div className="flex-shrink-0">
                <SpriteImage spriteName={selectedSprite.name} styles={{ width: "50px", height: "50px", borderRadius: "50%" }} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Actions Stack:</h3>
              <ul className="space-y-2">
                {selectedSprite.actions.map((action, index) => (
                  <li key={index} className="flex justify-between items-center bg-blue-100 transform transition duration-200 ease-in-out hover:scale-105 text-blue-800 px-4 py-2 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md hover:bg-blue-200">
                    <div className=""> 
                      <ActionInput index={index} action={action} />
                    </div>
                    <button
                      className="p-1 rounded-full hover:bg-red-100 transition ease-in-out duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(deleteAction({ index }));
                      }}
                    >
                      <Trash width={"18px"} color='red' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-gray-600 italic mb-6">No sprite selected</p>
        )}
      </div>
    </div>
  );
};

export default MidArea;
